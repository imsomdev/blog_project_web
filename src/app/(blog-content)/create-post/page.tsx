"use client";
import ContentServices from "@/services/content.services";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import Tags from "../../../componants/tags/tags";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@nextui-org/react";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set<string>()
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string>("");

  const router = useRouter();

  const createPostMutation = useMutation({
    mutationFn: (payload: any) => ContentServices.createPost(payload),
    onSuccess: (response: any) => {
      toast.success("Successfully posted!");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error("Something went wrong, please try again!");
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", selectedTagIds);

    console.log(formData);
    createPostMutation.mutate(formData);
  };
  console.log(selectedTagIds, "tags");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className=" bg-white p-8 rounded shadow-md w-full max-w-2xl h-[35rem]"
      >
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <Input
            type="text"
            id="title"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            variant="underlined"
            label="Content"
            labelPlacement="outside"
            placeholder="Write your content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full flex flex-col gap-2">
          <Tags
            setSelectedTagIds={setSelectedTagIds}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
