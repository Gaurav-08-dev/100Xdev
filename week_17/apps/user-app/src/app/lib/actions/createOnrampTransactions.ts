"use server";

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnrampTransaction(provider: string, value: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session?.user?.id)
    return {
      message: "unauthenticated request!👀",
    };
  const onRamptoken = Math.floor(Math.random() * 1000).toString();

  await prisma.onRampTransaction.create({
    data: {
      provider: provider,
      status: "Processing",
      token: onRamptoken,
      amount: value * 100,
      userId: Number(session?.user?.id),
      startTime: new Date(),
    },
  });

  return {
    message: "Done",
  };
}
