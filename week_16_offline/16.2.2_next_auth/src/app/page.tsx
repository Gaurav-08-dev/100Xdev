"use client";

import { signIn, signOut, useSession } from "next-auth/react";
export default function Home() {
  const session = useSession();

  return (
    <>
      <div onClick={() => signIn()}>Signin</div>
      <div onClick={() => signOut()}>SignOut</div>
      {
        JSON.stringify(session)
      }
    </>
  );
}
