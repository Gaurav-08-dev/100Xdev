"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signin = () => {
  const router = useRouter();
  return (
    <div>
      <button
        type="button"
        onClick={async () => {
          await signIn("google");
        }}
      >
        Login with google
      </button>
      <button
        type="button"
        onClick={async () => {
          const res = await signIn("credentials", {
            username: "",
            password: "",
            redirect: false,
          });
          console.log(res);
          router.push("/");
        }}
      >
        Login with email
      </button>
      <br/>
    </div>
  );
};

export default Signin;
