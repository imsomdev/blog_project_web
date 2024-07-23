"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ChatServices from "@/services/chat.services";
import { getLocalValue } from "@/utils/localStorage.utils";
import styles from "./ChatInputOutput.module.css";

interface Message {
  text: string;
  sender: string;
  receiver?: string;
  timestamp?: any;
}

const ChatInputOutput: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherUsername, setOtherUsername] = useState("");
  const [usernameEntered, setUsernameEntered] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const userName = getLocalValue("userDetails")?.username;

  const { data, refetch } = useQuery({
    queryKey: ["chat-history", userName, otherUsername],
    queryFn: () => ChatServices.getChatHistory(userName, otherUsername),
    enabled: usernameEntered, // Fetch chat history only when usernames are entered
  });

  useEffect(() => {
    if (usernameEntered && userName && otherUsername) {
      const newSocket = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${userName}/${otherUsername}/`
      );
      setSocket(newSocket);

      newSocket.onmessage = (event) => {
        console.log(`Received message: ${event.data}`);
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message, sender: data.sender },
        ]);
      };

      newSocket.onopen = () => {
        console.log("Connected to the WebSocket server");
      };

      newSocket.onerror = (event) => {
        console.error("Error occurred:", event);
      };

      newSocket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      return () => {
        newSocket.close();
      };
    }
  }, [usernameEntered, userName, otherUsername]);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  const handleUsernameSubmit = () => {
    if (userName.trim() !== "" && otherUsername.trim() !== "") {
      setUsernameEntered(true);
      refetch();
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && usernameEntered && socket) {
      const message = {
        message: newMessage,
        sender: userName,
      };
      socket.send(JSON.stringify(message));
      setNewMessage("");
    }
  };

  return (
    <div className={styles.chatContainer}>
      {!usernameEntered ? (
        <div className={styles.usernameInput}>
          <input
            type="text"
            value={otherUsername}
            onChange={(e) => setOtherUsername(e.target.value)}
            placeholder="Enter the username of the person you want to chat with..."
            className={styles.textInput}
          />
          <button onClick={handleUsernameSubmit} className={styles.sendButton}>
            Start Chat
          </button>
        </div>
      ) : (
        <>
          <h2>{otherUsername}</h2>

          <div className={styles.chatLog}>
            {messages.map((message: any, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.sender === userName ? styles.sent : ""
                }`}
              >
                {/* <strong>{message.sender}:</strong> */}
                <p>{message.text ? message.text : message?.message}</p>
              </div>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className={styles.textInput}
            />
            <button onClick={handleSendMessage} className={styles.sendButton}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatInputOutput;
