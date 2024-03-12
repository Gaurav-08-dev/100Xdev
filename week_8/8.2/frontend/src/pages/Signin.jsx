import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import AuthStructure from "../components/AuthStructure";

const Signin = () => {

  const handleSignin = () => {

  }
  return (
    <AuthStructure>
      <Heading label="Sign in" />
      <Subheading label="Enter your credentials to access your account" />
      <InputBox label="Email" placeholder="Enter Email" />
      <InputBox label="Password" placeholder="Enter Password" />
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
