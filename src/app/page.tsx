import BlogPosts from "@/componants/blogPosts/BlogPosts";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { getLocalValue } from "@/utils/localStorage.utils";

export default function Home() {
  return (
    <>
      <div className="text-red-500">
        Welcome To YouBlog
        <Button>Click me</Button>
      </div>
      <BlogPosts />
    </>
  );
}
