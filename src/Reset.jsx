import React from "react";
import { useFormik } from "formik";
import { API } from "./global";
import { useNavigate } from "react-router-dom";
import "./Reset.css"; // Import the CSS file

export function Reset() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      newPassword: "",
      token: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const data = await fetch(`${API}/users/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (data.status === 200) {
        navigate("/");
      }
    },
  });

  return (
    <div className="container">
      <h1>Reset Password</h1>
      <form className="form" onSubmit={formik.handleSubmit}>
        <input
          placeholder="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <input
          placeholder="New Password"
          name="newPassword"
          type="password"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
        />
        <input
          placeholder="Code"
          name="token"
          value={formik.values.token}
          onChange={formik.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
