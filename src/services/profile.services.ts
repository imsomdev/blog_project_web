import { isAxiosError } from "axios";
import axios from "@/configs/axios.config";

const ProfileServices = {
  async register(userData: any) {
    try {
      const response = await axios.post("register", {
        ...userData,
      });
      return response;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
  async login(userData: any) {
    try {
      const response = await axios.post("login", {
        ...userData,
      });
      //   console.log(response.data, "RESPONSE");
      //   return response.data;
    } catch (error: any) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.message);
      }
      throw new Error("Something went wrong. Please try again.");
    }
  },
};

export default ProfileServices;
