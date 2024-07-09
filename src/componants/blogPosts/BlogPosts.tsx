"use client";
import { useToken } from "@/context/TokenContext";
import ContentServices from "@/services/content.services";
import { getLocalValue } from "@/utils/localStorage.utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const BlogPosts = () => {
  const router = useRouter();
  const { token } = useToken();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog-posts", token],
    queryFn: () => token && ContentServices.getAllPost(),
    // retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;

  const handleReadPost = (id: string) => {
    router.push(`/blog-posts/${id}`);
  };

  return (
    token && (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((post: any) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <button
                onClick={() => handleReadPost(post.id)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
              >
                Read Post
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default BlogPosts;
