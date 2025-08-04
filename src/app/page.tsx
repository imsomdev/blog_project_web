"use client";
import BlogPosts from "@/componants/blogPosts/BlogPosts";
import { WebSocketProvider } from "@/context/ChatNotificationContext";
import { getLocalValue } from "@/utils/localStorage.utils";
import store from "@/utils/reduxStore.utils";
import { Suspense, useEffect, useState } from "react";
import { Provider } from "react-redux";
import Link from "next/link";

function Landing() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Welcome to the Blog
      </h1>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
        Discover insightful articles, trending topics, and community
        discussions. Log in to view posts and join the conversation.
      </p>
      <div className="flex gap-3">
        <Link
          href="/login"
          className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-5 py-2 rounded-md border border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Create account
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const details = getLocalValue("userDetails");
    setUserName(details?.username ?? null);
  }, []);

  // Until hydrated on client, avoid rendering posts to prevent mismatch
  if (!isClient) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const isLoggedIn = Boolean(localStorage.getItem("jwt"));

  return (
    <>
      <Provider store={store}>
        {isLoggedIn ? (
          <WebSocketProvider userName={userName ?? ""}>
            <Suspense fallback={<div>Loading...</div>}>
              <BlogPosts />
            </Suspense>
          </WebSocketProvider>
        ) : (
          <Landing />
        )}
      </Provider>
    </>
  );
}
