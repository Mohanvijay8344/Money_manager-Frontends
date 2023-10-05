import Color from "./Color";
import "./App.css";
import { ChangeEvent } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { PriceHistoryTable } from "./PriceHistoryTable";
import { TotalRates } from "./TotalRates";
import Button from '@mui/material/Button';
import { Signin } from "./Signin";
import { Signup } from "./Signup";
import { Forgot } from "./Forgot";
import { Reset } from "./Reset";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function Home() {

  const navigate = useNavigate();
  const signout = () => {
    localStorage.removeItem("token");
    navigate("/")
  }

  return (
    <div className="welcome">
      <div className="navbar">
        <h1>Welcome to Money Manager ❤️💕😍</h1>
        <Button variant="success" onClick={() => signout()}>Logout</Button>
      </div>
      <TotalRates />
      <PriceHistoryTable />
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? <section>{children}</section> : <Navigate replace to="/" />;
}

function Error() {
  return (
    <div className="error">
      <img
        className="error"
        src="https://t3.ftcdn.net/jpg/02/29/46/30/360_F_229463039_B4KwKD6ifdRV8G5S0sqrzBrAfHNzpReq.jpg"
        alt="error"
      />
    </div>
  );
}
