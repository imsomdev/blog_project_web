"use client";
import React from "react";
import ViewBlogPost from "./viewBlogPost/ViewBlogPost";

const page = ({ params }: { params: { post_id: string } }) => {
  return (
    <div>
      <ViewBlogPost params={params} />
    </div>
  );
};

export default page;
