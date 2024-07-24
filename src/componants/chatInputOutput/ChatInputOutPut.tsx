"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ChatServices from "@/services/chat.services";
import { getLocalValue } from "@/utils/localStorage.utils";
import styles from "./ChatInputOutput.module.css";
import { useRouter, useSearchParams } from "next/navigation";

interface Message {
  text: string;
  sender: string;
  receiver?: string;
  timestamp?: any;
}

const ChatInputOutput: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const router = useRouter();
  const userName = getLocalValue("userDetails")?.username;
  const searchParams = useSearchParams();
  const otherUsername = searchParams.get("user") || "";

  const { data, refetch } = useQuery({
    queryKey: ["chat-history", otherUsername],
    queryFn: () => ChatServices.getChatHistory(userName, otherUsername),
    enabled: !!otherUsername,
  });

  const { data: userNamesData, refetch: userNamesRefetch } = useQuery({
    queryKey: ["chat-user-list", userName],
    queryFn: () => ChatServices.getNameOfReceivers(),
  });

  useEffect(() => {
    if (userName && otherUsername) {
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
  }, [userName, otherUsername]);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "" && socket) {
      const message = {
        message: newMessage,
        sender: userName,
      };
      socket.send(JSON.stringify(message));
      setNewMessage("");
    }
  };

  const handleUserNameClicked = (username: string) => {
    router.push(`/chat?user=${username}`);
  };

  return (
    <div className={styles.chatContainer}>
      {!otherUsername ? (
        <div className={styles.userList}>
          {userNamesData?.map((userName: any) => (
            <button
              className={styles.userButton}
              key={`${userName.other_user}_${userName.userId}`}
              onClick={() => handleUserNameClicked(userName.other_user)}
            >
              {userName.other_user}
            </button>
          ))}
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
