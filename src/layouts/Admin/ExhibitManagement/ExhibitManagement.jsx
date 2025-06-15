import React from "react";

import { Outlet, useNavigate } from "react-router-dom";

export default function ExhibitManagement() {
  return (
    <div className="manage-exhibit ">
      <div className="manage-header">
        <h3 className=" font-w-900 color-red-text ">QUẢN LÝ TRƯNG BÀY</h3>
        <hr />
      </div>

      <div className="manage-body">
        <Outlet />
      </div>
    </div>
  );
}
