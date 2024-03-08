import {  useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
  return (
    <div>
      Dashboard
      <button onClick={()=>navigate('/')}>Home</button>
    </div>
  );
};

export default Dashboard;
