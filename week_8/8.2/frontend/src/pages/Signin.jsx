import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import AuthStructure from "../components/AuthStructure";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    axios
      .post("http://localhost:3069/api/v1/user/signin", {
        username: email,
        password,
      })
      .then((res) => {
        localStorage.setItem("user-token", res.data.token);
        navigate("/dashboard");
      });
  };

  return (
    <AuthStructure>
      <Heading label="Sign in" />
      <Subheading label="Enter your credentials to access your account" />
      <InputBox
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        placeholder="Enter Email"
      />
      <InputBox
        onChange={(e) => setPassword(e.target.value)}
        label="Password"
        placeholder="Enter Password"
      />
      <div className="pt-4">
        <Button label="Sign In" onClick={() => handleSignin()} />
      </div>
      <BottomWarning
        label="Don't have an account?"
        to="/signup"
        buttonText="Sign Up"
      />
    </AuthStructure>
  );
};

export default Signin;
