import { isAxiosError } from "axios";
import axios from "@/configs/axios.config";
import { getLocalValue } from "@/utils/localStorage.utils";

const ContentServices = {
  async createPost(data: any) {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.post("create-post", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
  async getPostById(post_id: string) {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get(`blog-posts/${post_id}`, {
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
  async getAllPost() {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get("blog-posts", {
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
export default ContentServices;
