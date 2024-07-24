import { isAxiosError } from "axios";
import axios from "@/configs/axios.config";

const ChatSerivuces = {
  async getChatHistory(user1: string, user2: string) {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get(`chat/history/${user1}/${user2}/`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
  async getNameOfReceivers() {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get("get-user-rooms", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
};

export default ChatSerivuces;
