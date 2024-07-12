import ContentServices from "@/services/content.services";
import { getLocalValue } from "@/utils/localStorage.utils";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

const DeletePost = ({ postId, data }: any) => {
  const userName = getLocalValue("userDetails")?.username;
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    <>
      <Button isIconOnly color="danger" aria-label="Like" onPress={onOpen}>
        <MdDeleteForever />
      </Button>
      <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Post
              </ModalHeader>
              <ModalBody>
                <p>Want to delete the blog post?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={handleOnClick}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  ) : null;
};

export default DeletePost;
