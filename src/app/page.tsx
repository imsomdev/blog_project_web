"use client";
import BlogPosts from "@/componants/blogPosts/BlogPosts";
import { WebSocketProvider } from "@/context/ChatNotificationContext";
import { getLocalValue } from "@/utils/localStorage.utils";
import store from "@/utils/reduxStore.utils";
import { Suspense } from "react";
import { Provider } from "react-redux";

export default function Home() {
  const userName = getLocalValue("userDetails")?.username;
  return (
    <>
      <Provider store={store}>
        <WebSocketProvider userName={userName}>
          <Suspense fallback={<div>Loading...</div>}>
            <BlogPosts />
          </Suspense>
        </WebSocketProvider>
      </Provider>
    </>
  );
}
