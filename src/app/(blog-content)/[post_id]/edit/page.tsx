"use client";
import ContentServices from "@/services/content.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Input, Textarea } from "@nextui-org/react";
import Tags from "@/componants/tags/tags";
import { useRouter } from "next/navigation";
import { TAGS } from "@/utils/constants.utils";

const EditPost = ({ params }: { params: { post_id: string } }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set<string>()
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string>("");
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog-post-view", params.post_id],
    queryFn: () => ContentServices.getPostById(params.post_id),
  });

  const handleSelectionChange = (keys: any) => {
    const selectedTagIds = Array.from(keys)
      .map((key) => {
        const tag = TAGS.find((tag) => tag.name === key);
        return tag ? tag.id : null;
      })
      .filter((id) => id !== null)
      .join(",");
    setSelectedTagIds(selectedTagIds);
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setContent(data.content);
      setSelectedKeys(new Set(data.tags.map((tag: any) => tag.name)));
      console.log(selectedKeys, "🐱‍👤");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    selectedKeys && handleSelectionChange(selectedKeys);
    console.log(selectedKeys, "KEYS");
  }, [selectedKeys]);

  const editPostMutation = useMutation({
    mutationFn: ({
      postId,
      formData,
    }: {
      postId: string;
      formData: FormData;
    }) => ContentServices.editPostById(postId, formData),
    onSuccess: (response: any) => {
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Edit post error:", error);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", selectedTagIds);

    editPostMutation.mutate({ postId: params.post_id, formData });
  };
  // console.log(selectedKeys, "edit");

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
        </div>
        <div className="mb-4 w-full flex flex-col gap-2">
          <Textarea
            variant="underlined"
            label="Content"
            labelPlacement="outside"
            placeholder="Write your content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Tags
          setSelectedTagIds={setSelectedTagIds}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
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

export default EditPost;
