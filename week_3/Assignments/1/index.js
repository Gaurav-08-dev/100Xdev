const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const jwtPassword = "12345678";

const allUsers = [
  {
    username: "priya@gmail.com",
    password: "12345678",
    name: "priya bimari",
  },

  {
    username: "ghiya@gmail.com",
    password: "123456789",
    name: "ghiya chinal",
  },

  {
    username: "rahul@gmail.com",
    password: "12345678",
    name: "rahul gandhi",
  },
];
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Sexy bc");
  console.log("bangkok");
});

app.get("/users", (req,res) => {
    const token = req.headers.authorization;
    try{
        const user = jwt.verify(token,jwtPassword)
        console.log(user)
        res.json({user})
    }catch(err){
        return res.status(403).json({
            msg:"Invalid Token"
        })
    }
});

function userExists(username, password) {
  return allUsers.find(
    (item) => item.username == username && item.password == password
  );
}

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User hai hi nhi",
    });
  }

  let token = jwt.sign({ username: username }, jwtPassword);
  return res.json({ token });
});

app.listen(6969);
