import React, { useContext, useState } from "react";
import "./login.scss";
import { login } from "../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { saveLogin } = useContext(LoginContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login({ email, password });
    saveLogin(data);
    alert("Đăng nhập thành công!");
    navigate("/");
  };

  return (
    <div className="page-login">
      <div className="wrap">
        <div className="login-header">Đăng nhập</div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
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
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
