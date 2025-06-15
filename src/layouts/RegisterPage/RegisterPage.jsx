import React, { useContext, useState } from "react";
import "./login.scss";
import { register } from "../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await register({ email, password });

    localStorage.setItem("registeredEmail", email);

    alert("Đăng ký thành công!");
    navigate("/email-confirm");
  };

  return (
    <div className="page-login">
      <div className="wrap">
        <div className="login-header">Đăng ký</div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="e">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-btn d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-4 w-100 py-2">
                Đăng ký
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
