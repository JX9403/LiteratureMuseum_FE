import React, { useContext, useState } from "react";

import { changePassword, login } from "../../api/AuthAPI";
import { useLocation, useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const location = useLocation();
  const { account } = location.state || {};
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();
  console.log("Account nhận được:", account);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await changePassword({ currentPassword, newPassword });
    if (data) {
      alert("Đổi mật khẩu thành công!");
      navigate("/");
    }
  };

  return (
    <div className="page-login">
      <div className="wrap">
        <div className="login-header">Đổi mật khẩu</div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="newPassword">Mật khẩu mới </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="login-btn d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-4 w-100 py-2">
                Thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
