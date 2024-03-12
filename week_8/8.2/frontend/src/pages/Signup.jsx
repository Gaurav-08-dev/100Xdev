import AuthStructure from "../components/AuthStructure";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

const Signup = () => {
  return (
    <AuthStructure>
      <Heading label="Sign Up" />
      <Subheading label="Enter your information to create an account" />
      <InputBox label="First Name" placeholder="First Name" />
      <InputBox label="Last Name" placeholder="Last Name" />
      <InputBox label="Email" placeholder="email@example.com" />
      <InputBox label="Password" placeholder="Enter Password" />
      <div className="pt-4">
        <Button label="Sign Up" onClick={() => {}} />
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
