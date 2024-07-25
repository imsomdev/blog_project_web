import React, { useState } from "react";
import styles from "../ChatInputOutput.module.css";
import { RiSendPlane2Fill } from "react-icons/ri";

interface Message {
  text: string;
  sender: string;
  receiver?: string;
  timestamp?: any;
}

interface ChatHistoryInterface {
  userName: string;
  messages: Message[];
  otherUsername: string;
  socket: WebSocket | null;
}

const ChatHistory = ({
  userName,
  otherUsername,
  messages,
  socket,
}: ChatHistoryInterface) => {
  const [newMessage, setNewMessage] = useState("");
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
  return (
    <>
      <h2 className={styles.usernameHeader}>{otherUsername}</h2>

      <div className={styles.chatLog}>
        {messages.map((message: any, index: any) => (
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
          <RiSendPlane2Fill />
        </button>
      </div>
    </>
  );
};

export default ChatHistory;
