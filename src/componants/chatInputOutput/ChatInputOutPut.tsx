"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ChatServices from "@/services/chat.services";
import { getLocalValue } from "@/utils/localStorage.utils";
import styles from "./ChatInputOutput.module.css";
import { useSearchParams } from "next/navigation";
import ChatHistory from "./chatHistory/ChatHistory";
import ChatListUser from "./chatListUsers/ChatListUser";

interface Message {
  text: string;
  sender: string;
  receiver?: string;
  timestamp?: any;
}

const ChatInputOutput: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const userName = getLocalValue("userDetails")?.username;
  const searchParams = useSearchParams();
  const otherUsername = searchParams.get("user") || "";

  const { data, refetch } = useQuery({
    queryKey: ["chat-history", otherUsername],
    queryFn: () => ChatServices.getChatHistory(userName, otherUsername),
    enabled: !!otherUsername,
  });

  useEffect(() => {
    if (userName && otherUsername) {
      const newSocket = new WebSocket(
        `${process.env.NEXT_PUBLIC_DJANGO_WEBSOCKET_URL}chat/${userName}/${otherUsername}`
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

  return (
    <div className={styles.chatContainer}>
      {!otherUsername ? (
        <ChatListUser userName={userName} />
      ) : (
        <ChatHistory
          otherUsername={otherUsername}
          messages={messages}
          userName={userName}
          socket={socket}
        />
      )}
    </div>
  );
};

export default ChatInputOutput;
