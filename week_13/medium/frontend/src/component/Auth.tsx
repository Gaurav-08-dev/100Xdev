import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="px-10">
          <div className="text-3xl font-extrabold">Create an account</div>

          <div className="text-slate-500 text-center pt-1">
            Already have an account?
            <Link className="pl-[1px] underline" to="/signin">
              Login
            </Link>
          </div>
          <div className="pt-8">
            <LabeledInput
              label="Username"
              placeholder="Enter your Username"
              onChange={() => {}}
              inputType="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function LabeledInput({
  label,
  placeholder,
  onChange,
  inputType,
}: {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputType?: string;
}) {
  return (
    <div>
      <label className="block mb-2 text-sm text-black font-semibold pt-4">
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required
        type={inputType}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default Auth;
