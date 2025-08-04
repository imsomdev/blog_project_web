"use client";
import ProfileServices from "@/services/profile.services";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).trim(),
  email: z.string().min(1, { message: "Email is required" }).email().trim(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .trim(),
});

const RegisterForm = () => {
  const router = useRouter();
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
      toast.success("Registered Successfully, Login now!");
      router.push("/login");
    },
    onError: (error) => {
      toast.error("Registration failed, please try again!");
      console.error("Registration error:", error);
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
    <div className="w-full max-w-md">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 shadow-xl backdrop-blur-lg dark:border-slate-800/60 dark:bg-slate-900/60">
        <div className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(220px_220px_at_90%_-10%,black,transparent)]">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
        </div>

        <div className="relative px-6 py-7 sm:px-8 sm:py-9">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md ring-1 ring-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.206 0 4-1.794 4-4S14.206 4 12 4 8 5.794 8 8s1.794 4 4 4zm0 2c-3.309 0-6 2.014-6 4.5V20h12v-1.5c0-2.486-2.691-4.5-6-4.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Create your account
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Join the community
            </p>
          </div>

          <form
            id="register-user"
            onSubmit={handleSubmit(handleRegistration)}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Username
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4.5 w-4.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.206 0 4-1.794 4-4S14.206 4 12 4 8 5.794 8 8s1.794 4 4 4zM4 18c0-2.761 3.589-5 8-5s8 2.239 8 5v1H4v-1z" />
                  </svg>
                </span>
                <input
                  placeholder="Enter username"
                  type="text"
                  id="username"
                  {...register("username")}
                  className={`block w-full rounded-xl border bg-white/80 py-3 pl-10 pr-3 text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500/40 dark:bg-slate-800/70 dark:text-slate-100 ${
                    errors?.username
                      ? "border-red-500 focus:ring-red-500/30"
                      : "border-slate-300/80 dark:border-slate-700/70"
                  }`}
                />
              </div>
              {errors?.username && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors?.username?.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Email
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4.5 w-4.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 4H4c-1.103 0-2 .897-2 2v1l10 6 10-6V6c0-1.103-.897-2-2-2z" />
                    <path d="M22 8.243l-10 6-10-6V18c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V8.243z" />
                  </svg>
                </span>
                <input
                  placeholder="Enter email"
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`block w-full rounded-xl border bg-white/80 py-3 pl-10 pr-3 text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500/40 dark:bg-slate-800/70 dark:text-slate-100 ${
                    errors?.email
                      ? "border-red-500 focus:ring-red-500/30"
                      : "border-slate-300/80 dark:border-slate-700/70"
                  }`}
                />
              </div>
              {errors?.email && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors?.email?.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4.5 w-4.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 9V7a5 5 0 10-10 0v2H5v12h14V9h-2zm-8 0V7a3 3 0 016 0v2H9z" />
                  </svg>
                </span>
                <input
                  placeholder="Enter password"
                  type="password"
                  id="password"
                  {...register("password")}
                  className={`block w-full rounded-xl border bg-white/80 py-3 pl-10 pr-3 text-slate-900 placeholder-slate-400 shadow-sm outline-none transition focus:ring-2 focus:ring-blue-500/40 dark:bg-slate-800/70 dark:text-slate-100 ${
                    errors?.password
                      ? "border-red-500 focus:ring-red-500/30"
                      : "border-slate-300/80 dark:border-slate-700/70"
                  }`}
                />
              </div>
              {errors?.password && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors?.password?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 px-4 py-3 font-medium text-white shadow-sm transition hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-70"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm">
            <span className="text-slate-500">Already have an account?</span>{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
