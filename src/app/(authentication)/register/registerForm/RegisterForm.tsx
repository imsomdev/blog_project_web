"use client";
import ProfileServices from "@/services/profile.services";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).trim(),
  email: z.string().min(1, { message: "Email is required" }).email().trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .trim(),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useMutation({
    mutationFn: (payload) => ProfileServices.register(payload),
    onSuccess: () => {
      // Handle success (e.g., show success message, redirect to login page)
      console.log("User registered successfully");
    },
  });

  const handleRegistration = async (data: any) => {
    try {
      await registerMutation.mutateAsync(data);
    } catch (error) {
      // Handle specific error cases if needed
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
      <form id="register-user" onSubmit={handleSubmit(handleRegistration)}>
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
              {errors?.username?.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            placeholder="Enter email"
            type="email"
            id="email"
            {...register("email")}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors?.email ? "border-red-500" : ""
            }`}
          />
          {errors?.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.email?.message}
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
              {errors?.password?.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>
      </form>

      <div className="mt-4">
        <Link href="/login">
          <p className="text-blue-500 hover:underline">
            Already Registered? Click Here to Login
          </p>
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
