import DeletePost from "@/componants/deletePost/DeletePost";
import EditPost from "@/componants/editPost/EditPost";
import LoadingSpinner from "@/componants/loadingSpinner/LoadingSpinner";
import ContentServices from "@/services/content.services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styles from "./ViewBlogPost.module.css";
import { FaRegMessage } from "react-icons/fa6";

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

  return (
    <div className={styles.gridContainer}>
      <div className={styles.blogPostContent}>
        <h1>{data?.title}</h1>
        <p>{data?.content}</p>
        <div className={styles.tags}>
          Tags:{" "}
          {data?.tags.map((item: any) => (
            <span key={item.id}>{item.name}, </span>
          ))}
        </div>
        <p className={styles.author}>
          Author: {data?.author}
          <FaRegMessage />
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
