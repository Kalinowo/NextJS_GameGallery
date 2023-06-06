"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import PostModal from "./PostModal";

import Button from "@/app/components/Button";

export default function Feed() {
  const [postModal, setPostModal] = useState(false);
  const { data: session } = useSession();
  function openPostModal() {
    setPostModal((prev) => !prev);
  }
  return (
    <div className="w-full flex-center flex-col">
      {session && (
        <div className="relative w-full flex-center mt-5">
          <Button type="button" onClick={openPostModal}>
            Post
          </Button>
        </div>
      )}

      {postModal && (
        <PostModal openPostModal={openPostModal} userId={session?.user.id} />
      )}
    </div>
  );
}
