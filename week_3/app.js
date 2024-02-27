const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING;
);

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});
app.get("/", (req,res)=>{
    res.send("Mongoose aaah")
})

app.post("/signin", async (req,res)=>{
    
})
app.post("/signup", async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) return res.status(400).send("User with same Email already exists");

    const user = new User({
      name: name,
      email: email,
      password: password,
    });
    user.save();

    res.send("User Created");
  } catch (err) {
    return res.status(403).send("Could not connect to db");
  }
});
app.listen(3001);
