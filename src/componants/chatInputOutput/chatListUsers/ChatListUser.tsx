import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../ChatInputOutput.module.css";
import ChatServices from "@/services/chat.services";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ChatListUserInterface {
  userName: string;
}

const ChatListUser = ({ userName }: ChatListUserInterface) => {
  const router = useRouter();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const { data, refetch } = useQuery({
    queryKey: ["chat-user-list", userName],
    queryFn: () => ChatServices.getNameOfReceivers(),
  });
  useEffect(() => {
    if (userName) {
      const newSocket = new WebSocket(
        `${process.env.NEXT_PUBLIC_DJANGO_WEBSOCKET_URL}notification/chat/${userName}`
      );
      setSocket(newSocket);

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data, "notification received");
        if (data.type === "chat_notification")
          setNotifications((prev) => [
            ...prev,
            `New message from ${data.sender}`,
          ]);
        toast.success(`${data.sender} messaged you!`);
      };

      newSocket.onopen = () => {
        console.log("Connected to the WebSocket server for notifications");
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
  }, [userName]);

  const handleUserNameClicked = (username: string) => {
    router.push(`/chat?user=${username}`);
  };

  return (
    <div className={styles.userList}>
      {notifications.length > 0 && (
        <div className={styles.notifications}>
          {notifications.map((notification, index) => (
            <div key={index} className={styles.notification}>
              {notification}
            </div>
          ))}
        </div>
      )}
      {data?.map((userName: any) => (
        <button
          className={styles.userButton}
          key={`${userName.other_user}_${userName.userId}`}
          onClick={() => handleUserNameClicked(userName.other_user)}
        >
          {userName.other_user}
        </button>
      ))}
    </div>
  );
};

export default ChatListUser;
