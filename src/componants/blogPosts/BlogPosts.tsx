"use client";
import { useToken } from "@/context/TokenContext";
import ContentServices from "@/services/content.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import {
  Card,
  CardHeader,
  CardFooter,
  Image,
  Button,
  Pagination,
  Link,
} from "@nextui-org/react";
import styles from "./BlogPosts.module.css";
import { PiEmptyDuotone } from "react-icons/pi";
import PollModal from "../pollModal/PollModal";

const BlogPosts = () => {
  const router = useRouter();
  const { token } = useToken();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const isRecentPosts = searchParams.get("recent-post");
  const pageNumber: string = searchParams.get("page") || "1";
  const pageSize: number = 8;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog-posts", token, searchTerm, isRecentPosts, pageNumber],
    queryFn: () => {
      if (token) {
        if (searchTerm) {
          return ContentServices.searchPosts(searchTerm, pageNumber);
        } else if (isRecentPosts === "true") {
          return ContentServices.getRecentPost(pageNumber);
        } else {
          return ContentServices.getAllPost(Number(pageNumber));
        }
      }
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const totalPage = data ? Math.ceil(data.count / pageSize) : 1;

  const handleReadPost = (id: string) => {
    router.push(`/blog-posts/${id}`);
  };

  const handlePagination = (page: number) => {
    const param = new URLSearchParams(window.location.search);
    param.set("page", page.toString());
    router.replace(`/?${param.toString()}`);

    // console.log(param.toString());
  };
  console.log(isRecentPosts, "isRecentPosts");

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return searchTerm ? (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <PiEmptyDuotone className="h-6 w-6" />
          <span>No results found</span>
        </div>
      </div>
    ) : (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="text-center">
          <Link
            href="
          /login"
          >
            Login
          </Link>{" "}
          to Read Posts
        </div>
      </div>
    );
  }

  return (
    token && (
      <div className={styles.gridContainer}>
        {data?.results?.map((post: any) => (
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
                <p className="text-tiny text-white">Posted by </p>
                <p className="text-base text-white">{post.author}</p>
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
        {totalPage > 1 && (
          <div className={styles.bottomCentered}>
            <Pagination
              loop
              showControls
              color="primary"
              total={totalPage}
              initialPage={Number(pageNumber)}
              onChange={handlePagination}
            />
          </div>
        )}
        {/* <PollModal /> */}
      </div>
    )
  );
};

export default BlogPosts;
