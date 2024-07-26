"use client";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface WebSocketProviderProps {
  children: React.ReactNode;
  userName: string;
}

interface WebSocketContextType {
  socket: WebSocket | null;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null
);

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
  userName,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (userName) {
      const notificationSocket = new WebSocket(
        `${process.env.NEXT_PUBLIC_DJANGO_WEBSOCKET_URL}notification/chat/${userName}`
      );

      notificationSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "chat_notification") {
          toast.success(`${data.sender} messaged you!`);
        }
      };

      setSocket(notificationSocket);

      return () => {
        notificationSocket.close();
      };
    }
  }, [userName]);
  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};
