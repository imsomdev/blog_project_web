import ContentServices from "@/services/content.services";
import { getLocalValue } from "@/utils/localStorage.utils";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

const DeletePost = ({ postId, data }: any) => {
  const userName = getLocalValue("userDetails")?.username;
  const router = useRouter();
  const deleteMutation = useMutation({
    mutationFn: (payload: any) => ContentServices.deletePostById(payload),
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      router.push("/");
    },
    onError: () => {
      toast.error("Something went wrong, Please try again!!");
    },
  });
  const handleOnClick = () => {
    deleteMutation.mutate(postId);
  };
  console.log(data?.author);

  return data?.author === userName ? (
    <div className="flex gap-4 items-center">
      <Button
        isIconOnly
        color="danger"
        aria-label="Like"
        onClick={handleOnClick}
      >
        <MdDeleteForever />
      </Button>
    </div>
  ) : null;
};

export default DeletePost;
