/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const debounce = (func, delay = 1000) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const User = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = (filter) => {
    const token = localStorage.getItem("user-token");
    axios
      .get("http://localhost:3069/api/v1/user/bulk?filter=" + filter, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsers(res.data.user))
      .catch((err) => console.log(err));
  };

  const debouncedFetch = debounce(fetchUsers);

  const handleFilterChange = (e) => {
    debouncedFetch(e.target.value);
  };
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search Users..."
          className="w-full px-2 border rounded border-slate-200"
          onChange={(e) => handleFilterChange(e)}
        />
      </div>
      <div>
        {users.map((user) => (
          <UserComp key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

const UserComp = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <div className="flex flex-col justify-center h-full">
        <Button
          label="Send Money"
          onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
          }}
        />
      </div>
    </div>
  );
};

export default User;
