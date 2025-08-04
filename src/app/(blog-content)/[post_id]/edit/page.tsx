"use client";
import ContentServices from "@/services/content.services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { Input, Textarea, Chip, Spinner } from "@nextui-org/react";
import Tags from "@/componants/tags/tags";
import { useRouter } from "next/navigation";
import { TAGS } from "@/utils/constants.utils";
import toast from "react-hot-toast";

const EditPost = ({ params }: { params: { post_id: string } }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    new Set<string>()
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string>("");

  const isTitleValid = title.trim().length >= 3;
  const isContentValid = content.trim().length >= 20;
  const isFormValid = isTitleValid && isContentValid;

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (selectedKeys) handleSelectionChange(selectedKeys);
  }, [selectedKeys]);

  const editPostMutation = useMutation({
    mutationFn: ({
      postId,
      formData,
    }: {
      postId: string;
      formData: FormData;
    }) => ContentServices.editPostById(postId, formData),
    onSuccess: () => {
      toast.success("Post updated");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong, Please try again!");
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      toast.error("Please complete required fields before saving.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", content.trim());
    formData.append("tags", selectedTagIds);

    editPostMutation.mutate({ postId: params.post_id, formData });
  };

  const selectedTagsPreview = useMemo(() => {
    if (!selectedKeys || (selectedKeys as Set<string>).size === 0) return [];
    return Array.from(selectedKeys) as string[];
  }, [selectedKeys]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-red-600">
        Error: {(error as any)?.message || "Failed to load post"}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-50 to-white py-10">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-800">
            Edit post
          </h1>
          <p className="text-slate-500 mt-1">
            Update the content and tags of your post.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Title
              </label>
              <Input
                type="text"
                id="title"
                size="lg"
                radius="sm"
                placeholder="An engaging headline..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={title.length > 0 && !isTitleValid}
                errorMessage={
                  !isTitleValid && title.length > 0
                    ? "Title must be at least 3 characters."
                    : undefined
                }
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Content
              </label>
              <Textarea
                id="content"
                minRows={8}
                radius="sm"
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                isInvalid={content.length > 0 && !isContentValid}
                errorMessage={
                  !isContentValid && content.length > 0
                    ? "Content must be at least 20 characters."
                    : undefined
                }
              />
              <div className="mt-2 text-xs text-slate-400">
                {content.trim().length} characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tags
              </label>
              <div className="flex items-center gap-3">
                <Tags
                  setSelectedTagIds={setSelectedTagIds}
                  selectedKeys={selectedKeys}
                  setSelectedKeys={setSelectedKeys}
                />
              </div>
              {selectedTagsPreview.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedTagsPreview.map((tag) => (
                    <Chip key={tag} size="sm" color="primary" variant="flat">
                      {tag}
                    </Chip>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isFormValid || editPostMutation.isPending}
              className={`inline-flex items-center justify-center px-5 py-2.5 rounded-md text-white transition
                ${
                  isFormValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
            >
              {editPostMutation.isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner size="sm" color="white" />
                  Saving...
                </span>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
