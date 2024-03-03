const secret = require("../config");
const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course, User } = require("../db");
const jwt = require("jsonwebtoken");
const router = Router();

// Admin Routes

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  
  const { username, password } = req.body;
  const user = await Admin.find({
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
router.post("/signup", async (req, res) => {
  // Implement admin signup logic

  const username = req.body.username;
  const password = req.body.password;

  await Admin.create({ username: username, password: password })
    .then(() => {
      res.json({ msg: "Admin Created Successfully" });
    })
    .catch(() => {
      res.status(403).json({ msg: "Admin cannot be created" });
    });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic

  const { title, description, price, imageLink } = req.body;

  await Course.create({
    title,
    description,
    price,
    imageLink,
  })
    .then((newCourse) => {
      res.json({
        msg: "Course created successfully 👌",
        courseId: newCourse._id,
      });
    })
    .catch(() => {
      res.status(403).json({ msg: "Course cannot be created" });
    });


});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  const response = await Course.find({});
  res.json({msg:response})

});

module.exports = router;
