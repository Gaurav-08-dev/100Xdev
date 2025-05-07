import React from "react";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  //  TODO: add types later
  onSignIn: any;
  onSignOut: any;
}

const Appbar = ({ user, onSignIn, onSignOut }: AppbarProps) => {
  console.log(user)
  return (
    <div className="flex justify-between border-b px-4 py-2 items-center ">
      <div className="text-lg">Paytm</div>
      <div className="flex flex-col justify-center">
        <button
        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
         type="button" onClick={user ? onSignOut : onSignIn}>
          {user ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Appbar;
