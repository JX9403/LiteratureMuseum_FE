import React from "react";

import { Outlet, useNavigate } from "react-router-dom";

export default function NewsManagement() {
  return (
    <div className="manage-news ">
      <div className="manage-header">
        <h3 className=" font-w-900 color-red-text ">QUẢN LÝ TIN TỨC</h3>
        <hr />
      </div>

      <div className="manage-body">
        <Outlet />
      </div>
    </div>
  );
}
