const { Router } = require("express");
const jwt = require("jsonwebtoken");
const router = Router();
const { User, Account } = require("../db/index");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/middleware");
const { signupSchema, signInSchema, updateSchema } = require("../zod");

router.get("/", (req, res) => {
  return res.send("heheheheheh");
});

router.post("/signup", async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);

  if (!success) return res.status(411).json({ msg: "Invalid Inputs" });

  const user = await User.findOne({ username: req.body.username });

  if (user)
    return res
      .status(411)
      .json({ msg: "Email already taken / Incorrect inputs" });

  const { username, firstName, lastName, password } = req.body;

  const userCreated = await User.create({
    username: username,
    firstName: firstName,
    lastName: lastName,
    password: password,
  });

  const createdUserId = userCreated._id;
  await Account.create({
    balance: 1 + Math.random() * 10000,
    userId: createdUserId,
  });

  const token = jwt.sign({ createdUserId }, JWT_SECRET);

  res.json({ msg: "User Created Successfully", token: token });
});

router.post("/signin", async (req, res) => {
  const { success } = signInSchema.safeParse(req.body);

  if (!success) return res.status(411).json({ msg: "Invalid Inputs" });

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign({ user: user._id }, JWT_SECRET);
    res.json({ token: token });
    return;
  }

  return res.status(411).json({ msg: "Error while loggin in" });
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);

  if (!success)
    return res.status(411).json({ msg: "Error while updating information" });

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({ message: "Updated Successfully" });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const params = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: params,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: params,
          $options: "i",
        },
      },
    ],
  });

  return res.json({
    user: users
      .filter((item) => item._id.toString() !== req.userId)
      .map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id.toString(),
      })),
  });
});

module.exports = router;
