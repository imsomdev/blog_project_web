import React from "react";
import { Button } from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { getLocalValue } from "@/utils/localStorage.utils";
export default function EditPost({ postId, data }: any) {
  const userName = getLocalValue("userDetails")?.username;
  const router = useRouter();
  const handleOnClick = () => {
    router.push(`/${postId}/edit`);
  };
  return data?.author === userName ? (
    <div className="flex gap-4 items-center">
      <Button
        isIconOnly
        color="primary"
        aria-label="Like"
        onClick={handleOnClick}
      >
        <CiEdit />
      </Button>
    </div>
  ) : null;
}
