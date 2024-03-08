import { Suspense, lazy } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const Dashboard = lazy(() => import("../src/components/Dashboard"));
const Home = lazy(() => import("../src/components/Home"));

function App() {
  return (
    <>
      <nav style={{ backgroundColor: "red", width: "100%" }}>Nav Bar</nav>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<h3>Loading...</h3>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<h3>Loading...</h3>}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
