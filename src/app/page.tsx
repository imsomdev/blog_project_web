"use client";
import BlogPosts from "@/componants/blogPosts/BlogPosts";
import { getLocalValue } from "@/utils/localStorage.utils";
import store from "@/utils/reduxStore.utils";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <BlogPosts />
      </Provider>
    </>
  );
}
