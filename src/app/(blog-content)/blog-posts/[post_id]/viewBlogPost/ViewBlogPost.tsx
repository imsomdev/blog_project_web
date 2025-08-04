import DeletePost from "@/componants/deletePost/DeletePost";
import EditPost from "@/componants/editPost/EditPost";
import LoadingSpinner from "@/componants/loadingSpinner/LoadingSpinner";
import ContentServices from "@/services/content.services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styles from "./ViewBlogPost.module.css";
import { FaRegMessage } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Chip, Button, Skeleton, Divider } from "@nextui-org/react";
import { TAGS } from "@/utils/constants.utils";

interface BlogPostInterface {
  params: {
    post_id: string;
  };
}

const ViewBlogPost = ({ params }: BlogPostInterface) => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog-post-view", params.post_id],
    queryFn: () => ContentServices.getPostById(params.post_id),
  });

  const chatHandler = () => {
    router.push(`/chat?user=${data.author}`);
  };

  const tagHandler = (tag: string) => {
    const tags = TAGS.find((tagName: any) => tagName.name === tag);
    router.push(`/?tag=${tags?.id.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
          <Skeleton className="h-8 w-2/3 rounded-lg" />
          <div className="mt-6 space-y-3">
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-[92%] rounded-lg" />
            <Skeleton className="h-4 w-[88%] rounded-lg" />
            <Skeleton className="h-4 w-[80%] rounded-lg" />
          </div>
          <div className="mt-8 flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
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
      <article className="mx-auto max-w-3xl px-4">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            {data?.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <div className="inline-flex items-center gap-2">
              <span className="text-slate-600">Author:</span>
              <span className="font-medium text-slate-700">{data?.author}</span>
              <Button
                size="sm"
                variant="light"
                className="text-blue-600"
                onClick={chatHandler}
                startContent={<FaRegMessage />}
              >
                Message
              </Button>
            </div>
          </div>
        </header>

        <section className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="prose prose-slate max-w-none">
            <p className="whitespace-pre-wrap leading-7 text-slate-800">
              {data?.content}
            </p>
          </div>

          {data?.tags?.length > 0 && (
            <>
              <Divider className="my-6" />
              <div className="flex flex-wrap items-center gap-2">
                {data.tags.map((item: any) => (
                  <Chip
                    key={item.id}
                    size="sm"
                    variant="flat"
                    color="primary"
                    className="cursor-pointer"
                    onClick={() => tagHandler(item.name)}
                  >
                    {item.name}
                  </Chip>
                ))}
              </div>
            </>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {data && <EditPost postId={params.post_id} data={data} />}
            {data && <DeletePost postId={params.post_id} data={data} />}
          </div>
        </section>
      </article>
    </div>
  );
};

export default ViewBlogPost;
