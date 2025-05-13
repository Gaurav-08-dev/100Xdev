import express from "express";
const app = express();
import { prisma } from "@repo/db";

app.post("/hdfcWebhook", async (req, res) => {
  // TODO: add zod validation

  // TODO: check if the request actually came from the hdfc bank, use a webhook secret here
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    //   update balance in db, add txn

    await prisma.$transaction([
      prisma.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
      }),

      prisma.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.status(200).json({
      message: "capture",
    });
  } catch (e) {
    console.log(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});
