import React from "react";

import { Outlet, useNavigate } from "react-router-dom";

export default function WorkManagement() {
  return (
    <div className="manage-work ">
      <div className="manage-header">
        <h3 className=" font-w-900 color-red-text ">QUẢN LÝ TÁC PHẨM</h3>
        <hr />
      </div>

      <div className="manage-body">
        <Outlet />
      </div>
    </div>
  );
}
