"use client";
import ContentServices from "@/services/content.services";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface BlogPostInterface {
  params: {
    post_id: string;
  };
}

const ViewBlogPost = ({ params }: BlogPostInterface) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog-post-view", params.post_id],
    queryFn: () => ContentServices.getPostById(params.post_id),
  });
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>
      Tags:{" "}
      {data?.tags.map((item: any) => (
        <span key={item.id}>{item.name}, </span>
      ))}
    </div>
  );
};

export default ViewBlogPost;
