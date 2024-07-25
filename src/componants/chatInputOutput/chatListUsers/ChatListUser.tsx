import React from "react";
import styles from "../ChatInputOutput.module.css";
import ChatServices from "@/services/chat.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface ChatListUserInterface {
  userName: string;
}

const ChatListUser = ({ userName }: ChatListUserInterface) => {
  const router = useRouter();
  const { data: userNamesData, refetch: userNamesRefetch } = useQuery({
    queryKey: ["chat-user-list", userName],
    queryFn: () => ChatServices.getNameOfReceivers(),
  });

  const handleUserNameClicked = (username: string) => {
    router.push(`/chat?user=${username}`);
  };

  return (
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
  );
};

export default ChatListUser;
