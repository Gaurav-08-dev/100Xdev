"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "@repo/db";

export async function p2pTransfer(number: string, amount: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !session?.user?.id) {
    return {
      message: "unauthenticated",
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      number: number,
    },
  });
  if (!user) {
    return {
      message: "user not found",
    };
  }

  await prisma.$transaction(async (tx) => {
    const frombalance = await prisma.balance.findUnique({
      where: {
        userId: Number(session.user?.id),
      },
    });

    if(!frombalance || frombalance.amount < amount) throw new Error("Insufficient balance")
    
        await tx.balance.update({
            where:{
                userId:Number(session?.user?.id)
            },
            data:{
                amount: {decrement:amount}
            }
        })

        await tx.balance.update({
            where:{
                userId:Number(user?.id)
            },
            data:{
                amount: {increment:amount}
            }
        })

  });
}
