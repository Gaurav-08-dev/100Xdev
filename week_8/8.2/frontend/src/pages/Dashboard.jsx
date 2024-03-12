import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import User from "../components/UserComp";

const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance />
        <User />
      </div>
    </div>
  );
};

export default Dashboard;
