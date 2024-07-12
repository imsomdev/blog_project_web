"use client";
import { useToken } from "@/context/TokenContext";
import ContentServices from "@/services/content.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import styles from "./BlogPosts.module.css";
import { debounce } from "lodash";

const BlogPosts = () => {
  const router = useRouter();
  const { token } = useToken();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["blog-posts", token, searchTerm],
    queryFn: () =>
      token &&
      (searchTerm
        ? ContentServices.searchPosts(searchTerm)
        : ContentServices.getAllPost()),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  LoadingSpinner();
  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (isError)
    return searchTerm ? (
      <div>No result found</div>
    ) : (
      <div>Something went worng</div>
    );

  const handleReadPost = (id: string) => {
    router.push(`/blog-posts/${id}`);
  };
  console.log(searchTerm, "Search Term From Main Page");

  return (
    token && (
      <div className={styles.gridContainer}>
        {data.map((post: any) => (
          <Card
            key={post.id}
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-7 md:col-span-4 lg:col-span-3"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <h4 className="text-white font-medium text-xl overflow-hidden whitespace-nowrap text-ellipsis">
                {post.title}
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src="https://nextui.org/images/card-example-2.jpeg"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                {" "}
                <p className="text-tiny text-white">Posted by </p>
                <p className="text-base text-white">{post?.author}</p>
              </div>
              <Button
                radius="full"
                size="sm"
                onClick={() => handleReadPost(post.id)}
              >
                Read Post
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  );
};

export default BlogPosts;
