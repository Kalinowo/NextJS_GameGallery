"use client";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Button from "@/app/components/Button";
import { FaTimes } from "react-icons/fa";

interface PostModalProps {
  openPostModal: () => void;
  userId: any;
}

const PostModal = (props: PostModalProps) => {
  const session = useSession();
  const { openPostModal, userId } = props;
  const modalRef = useRef<HTMLInputElement>(null);
  const [postInput, setPostInput] = useState<string>("");

  function closePostModal(e: any) {
    if (modalRef.current === e.target) {
      openPostModal();
    }
  }
  const postImage = (e: any) => {
    e.preventDefault();
    axios
      .post("/api/image/new", { image: postInput, userId })
      .then(() => {
        console.log("成功");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function clearInput() {
    setPostInput("");
  }

  return (
    <>
      <div
        ref={modalRef}
        className="fixed inset-0 bg-black/50 flex justify-center items-center z-10"
        onClick={(e) => closePostModal(e)}
      >
        <div className="">
          <div className="flex justify-center items-center w-[300px] h-auto bg-white border-solid border-2 border-black p-5 rounded-md">
            <form className="w-full" onSubmit={postImage}>
              <div className="flex flex-row relative border-solid border-2 border-black rounded-md">
                <input
                  value={postInput}
                  onChange={(e) => setPostInput(e.target.value)}
                  type="text"
                  placeholder="圖片網址..."
                  className="p-2 w-full outline-none border-none rounded-md"
                />
                <div className="relative right-1 flex items-center h-[40px]">
                  <FaTimes
                    className="cursor-pointer hover:text-red-500"
                    onClick={() => clearInput()}
                  />
                </div>
              </div>
              <div className="flex mt-1 gap-1">
                <Button type="submit" flexBasis="60%" onClick={() => postImage}>
                  確定
                </Button>
                <Button type="button" onClick={openPostModal} flexBasis="40%">
                  取消
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostModal;
