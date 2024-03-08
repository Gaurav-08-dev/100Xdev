require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  username: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
