import React from "react";

import { Outlet, useNavigate } from "react-router-dom";

export default function UserManagement() {
  return (
    <div className="manage-user ">
      <div className="manage-header">
        <h3 className=" font-w-900 color-red-text ">QUẢN LÝ NGƯỜI DÙNG</h3>
        <hr />
      </div>

      <div className="manage-body">
        <Outlet />
      </div>
    </div>
  );
}
