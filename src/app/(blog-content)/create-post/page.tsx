"use client";
import ContentServices from "@/services/content.services";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import Tags from "../../../componants/tags/tags";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const createPostMutation = useMutation({
    mutationFn: (payload: any) => ContentServices.createPost(payload),
    onSuccess: (response: any) => {
      console.log(response);
    },
    onError: (error: any) => {
      console.error("Create post error:", error);
    },
  });

  // const handleTagsSelection = (selectedTags: string) => {
  //   console.log("Selected tags:", selectedTags);
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", "1, 2");

    console.log(formData);
    createPostMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>
      {/* <Tags onSelectTags={handleTagsSelection} /> */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreatePost;
