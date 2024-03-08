const { Router } = require("express");
const router = Router();
const { authMiddleware } = require("../middleware/middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({ balance: account.balance });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { to, amount } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (+account.balance < +amount || !account) {
    await session.abortTransaction();
    return res.status(400).json({ msg: "Insufficient Balance" });
  }

  const toAccount = await Account.findOne({
    userId: to,
  })
    .session(session)
    .session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({ msg: "Invalid Account" });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);

  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
});

module.exports = router;
