import React from "react";

import { Outlet, useNavigate } from "react-router-dom";

export default function StoryManagement() {
  return (
    <div className="manage-story ">
      <div className="manage-header">
        <h3 className=" font-w-900 color-red-text ">QUẢN LÝ CÂU CHUYỆN</h3>
        <hr />
      </div>

      <div className="manage-body">
        <Outlet />
      </div>
    </div>
  );
}
