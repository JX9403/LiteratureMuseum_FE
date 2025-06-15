import React, { useContext, useState } from "react";
import "./login.scss";
import { confirmEmail, register } from "../../api/AuthAPI";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
export default function ConfirmPage() {
  const email = localStorage.getItem("registeredEmail");

  const [confirmationCode, setConfirmationCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await confirmEmail({ email, confirmationCode });

    alert("Xác minh thành công!");
    navigate("/login");
  };

  return (
    <div className="page-login">
      <div className="wrap">
        <div className="login-header">Xác minh email</div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                disabled="true"
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="confirmationCode">Mã xác minh</label>
              <input
                type="text"
                className="form-control"
                id="confirmationCode"
                placeholder="Mã xác minh"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
              />
            </div>
            <div className="login-btn d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-4 w-100 py-2">
                Xác minh
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
