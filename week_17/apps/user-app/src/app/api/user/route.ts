import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/lib/auth";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return NextResponse.json({
      user: session.user,
    });
  }

  return NextResponse.json(
    {
      message: "Please login 😵",
    },
    {
      status: 403,
    }
  );
};
