import React from "react";
import { useFormik } from "formik";
import { API } from "./global";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

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
