"use client";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Button from "@/app/components/Button";

export default function SignIn() {
  const { data: session } = useSession();

  return (
    <>
      <div className="m-5 text-5xl">For Admin Only</div>
      <div className="text-xl">狀態：{session ? "登入" : "未登入"}</div>
      <div className="flex gap-1 m-5">
        <Button
          type="button"
          onClick={() => {
            signIn("google", { callbackUrl: "/", redirect: false });
          }}
          disabled={session ? true : false}
        >
          Google Login
        </Button>
        <Button
          type="button"
          onClick={() => signOut()}
          disabled={session ? false : true}
        >
          Signout
        </Button>
      </div>
    </>
  );
}
