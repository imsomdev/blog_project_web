import DeletePost from "@/componants/deletePost/DeletePost";
import EditPost from "@/componants/editPost/EditPost";
import LoadingSpinner from "@/componants/loadingSpinner/LoadingSpinner";
import ContentServices from "@/services/content.services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styles from "./ViewBlogPost.module.css";
import { FaRegMessage } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
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
      <div className={styles.loadingSpinner}>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  console.log(data);

  return (
    <div className={styles.gridContainer}>
      <div className={styles.blogPostContent}>
        <h1>{data?.title}</h1>
        <p>{data?.content}</p>
        <div className={styles.tags}>
          Tags:{" "}
          {data?.tags.map((item: any) => (
            <button
              key={item.id}
              style={{ marginRight: 8 }}
              onClick={() => tagHandler(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <p className={styles.author}>
          Author: {data?.author}
          <button onClick={chatHandler}>
            <FaRegMessage />
          </button>
        </p>

        <div className={styles.editDeleteBtns}>
          {data && <EditPost postId={params.post_id} data={data} />}
          {data && <DeletePost postId={params.post_id} data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ViewBlogPost;
