const express = require("express");
const app = express();
const zod = require("zod");

function userMiddleware(req, res, next) {
  if (username != "gaurav" && password !== "pass") {
    res.status(403).json({ msg: "Wrong inputs" });
  } else {
    next();
  }
}

function kidneyMiddleware(req, res, next) {
  if (kidneyId != 1 && kidneyId != 2) {
    res.status(400).json({ msg: "Wrong inptus" });
  } else {
    next();
  }
}

app.get("/health-checkup", userMiddleware, kidneyMiddleware, (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;
  const kidneyId = req.query.kidneyId;

  // ! ugly way of doing input validations
  // if (username !== "gaurav" && password !== "pass"){
  //   res.status(400).json({ msg: "Wrong inptus" });
  //   return;
  // }

  // if (kidneyId != 1 && kidneyId != 2) {
  //   res.status(400).json({ msg: "Wrong inptus" });
  //   return;
  // }

  res.send({
    msg: "Your kidney is fine!",
  });
});

// WHY DO WE NEED INPUT VALIDATIONS:


const schema = zod.array(zod.number());

app.use(express.json());

app.get("/health-checkup", (req, res) => {
  res.send("haan veere");
});

app.post("/health-checkup", function (req, res) {
  const kidneys = req.body.kidneys;
  //   const kidneyLength = kidneys.length;
  const response = schema.safeParse(kidneys);
  if (!response.success) {
    res.status(411).json({
      msg: "input is invalid",
    });
  } else {
    res.send({ response });
  }

  //   res.send("Your Kidney Length is" + kidneyLength);
});

// global catches

// app.use(function (err, req, res, next) {
//   res.json({
//     msg: "Na Maanne",
//   });
// });

app.listen(3000);
