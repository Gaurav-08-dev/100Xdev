const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const secret = require("../config");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic

  const { username, password } = req.body;
  await User.create({
    username,
    password,
  })
    .then(() => res.json({ msg: "User Created Successfully" }))
    .catch((err) => res.status(403).json({ msg: err }));
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic

  const { username, password } = req.body;
  const user = await User.find({
    username,
    password,
  });

  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      secret
    );
    res.json({ msg: token });
  } else {
    res.status(403).json({
      message: "Incorrect Email and Password",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const response = await Course.find({});
  res.json({ msg: response });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic

  const token = req.headers.authorization;

  const userInfo = jwt.decode(token?.split(" ")[1], { complete: true });

  const courseId = req.params.courseId;
  const username = userInfo?.payload.username;

  await User.updateOne(
    {
      username: username,
    },
    {
      $push: {
        purchasedCourses: courseId,
      },
    }
  );

  res.json({ msg: "Course Purchased Successfully!!" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const token = req.headers.authorization;
  const userInfo = jwt.decode(token?.split(" ")[1], { complete: true });
  const username = userInfo?.payload.username;

  const courses = await Course.find({
    _id:{
        $in:username.purchasedCourses
    }
  })

  res.json({courses:courses})
});

module.exports = router;
