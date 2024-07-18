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
  async getAllPost(pageNumber: number) {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get(`blog-posts?page=${pageNumber}`, {
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
  async editPostById(post_id: string, data: FormData) {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.put(`blog-posts/${post_id}`, data, {
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
  async deletePostById(post_id: string) {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.delete(`blog-posts/${post_id}`, {
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
  async searchPosts(searchTerm: string, pageNumber: string) {
    const token = localStorage.getItem("jwt");
    console.log(searchTerm, "FROM SERVICES");
    try {
      const response = await axios.get(
        `search?search=${searchTerm}&page=${pageNumber}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
  async getRecentPost(pageNumber: string) {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get(`recent-posts?page=${pageNumber}`, {
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
  async gePollDetails() {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get("polls", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = response.data;
      return data?.[data.length - 1];
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
  async submitPollDetails(payload: any) {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.post("polls", payload, {
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
  async pollsResult(ques_id: any) {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.post("polls-result", ques_id, {
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
