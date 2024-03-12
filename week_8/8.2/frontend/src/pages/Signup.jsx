import AuthStructure from "../components/AuthStructure";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState({});
  const [password, setPassword] = useState("");

  const handleName = (e, inputName) => {
    if (inputName === "first") setName({ ...name, firstName: e.target.value });
    if (inputName === "last") setName({ ...name, lastName: e.target.value });
    if (inputName === "email") setName({ ...name, email: e.target.value });
  };

  const handleSignup = () => {
    const { firstName, lastName, email } = name;

    axios
      .post("http://localhost:3069/api/v1/user/signup", {
        username: email,
        firstName,
        lastName,
        password,
      })
      .then((res) => {
        localStorage.setItem('user-token', res.data.token)
        setName({});
        setPassword("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <AuthStructure>
      <Heading label="Sign Up" />
      <Subheading label="Enter your information to create an account" />
      <InputBox
      value={name.firstName}
        label="First Name"
        placeholder="First Name"
        onChange={(e) => handleName(e, "first")}
      />
      <InputBox
      value={name.lastName}
        label="Last Name"
        placeholder="Last Name"
        onChange={(e) => handleName(e, "last")}
      />
      <InputBox
      value={name.email}
        label="Email"
        placeholder="email@example.com"
        onChange={(e) => handleName(e, "email")}
      />
      <InputBox
      value={password}
        label="Password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="pt-4">
        <Button label="Sign Up" onClick={() => handleSignup()} />
      </div>
      <BottomWarning
        label="Already have an account?"
        to="/signin"
        buttonText="Sign In"
      />
    </AuthStructure>
  );
};

export default Signup;
