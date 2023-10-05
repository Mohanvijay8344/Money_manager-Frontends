import Color from "./Color";
import "./App.css";
import { ChangeEvent } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { PriceHistoryTable } from "./PriceHistoryTable";
import { TotalRates } from "./TotalRates";
import Button from '@mui/material/Button';
import { Signup } from "./Signup";
import { Forgot } from "./Forgot";
import { Reset } from "./Reset";
import React from "react";
import { useFormik } from "formik";
import { API } from "./global";

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




export function Signin() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch(`${API}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (data.status === 401) {
        console.log("error");
        alert("Invalid Cretentials ❌❌")
      } else {
        console.log("success");
        const result = await data.json();
        console.log(result);
        localStorage.setItem("token", result.token);
        navigate("/home");
        alert("Login Successfull ✅✅")

      }
    },
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <form className="form" onSubmit={formik.handleSubmit}>
        <input
          placeholder="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <input
          placeholder="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button type="submit">Sign In</button>
        <label>
          Not a member? <a href="/signup">Sign Up</a>
        </label>
        <a href="/forgot-password">Forgot Password</a>
      </form>
    </div>
  );
}
