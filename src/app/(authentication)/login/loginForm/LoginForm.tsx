"use client";
import ProfileServices from "@/services/profile.services";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { setLocalValue } from "@/utils/localStorage.utils";
import { useToken } from "@/context/TokenContext";

const LoginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .trim(),
});

const LoginForm = () => {
  const router = useRouter();
  const { token, setToken } = useToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (payload: any) => ProfileServices.login(payload),
    onSuccess: (response: any) => {
      const jwtToken = response.jwt;
      setLocalValue("jwt", jwtToken);
      setToken(jwtToken);
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });

  const handleLogin = (data: any) => {
    loginMutation.reset();
    loginMutation.mutate(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            placeholder="Enter username"
            type="text"
            id="username"
            {...register("username")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors?.username ? "border-red-500" : ""
            }`}
          />
          {errors?.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.username.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            placeholder="Enter password"
            type="password"
            id="password"
            {...register("password")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors?.password ? "border-red-500" : ""
            }`}
          />
          {errors?.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.password.message}
            </p>
          )}
        </div>
        <button
          disabled={loginMutation.isPending}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="mt-4">
        <Link href="/register">
          <p className="text-blue-500 hover:underline">
            Click Here To Register
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
