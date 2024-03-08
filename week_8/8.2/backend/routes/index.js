const { Router } = require("express");
const userRouter = require("./user");
const useAccount = require("./account");
const router = Router();
router.use("/user", userRouter);
router.use("/account", useAccount);

module.exports = router;
