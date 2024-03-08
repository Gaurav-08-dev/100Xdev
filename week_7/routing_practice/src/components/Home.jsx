import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      Home
      <button onClick={()=>navigate('/dashboard')}>Dashboard</button>
    </div>
  );
}

export default Home