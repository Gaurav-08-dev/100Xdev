/* eslint-disable react/prop-types */

const Balance = ({ value=10000 }) => {
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your Balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {value}</div>
    </div>
  );
};

export default Balance;
