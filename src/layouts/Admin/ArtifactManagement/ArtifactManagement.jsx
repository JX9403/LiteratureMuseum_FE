import React from "react";

import { Outlet, useNavigate } from "react-router-dom";

export default function ArtifactManagement() {
  return (
    <div className="manage-artifact ">
      <div className="manage-header">
        <h3 className=" font-w-900 color-red-text ">QUẢN LÝ GIẢI THƯỞNG</h3>
        <hr />
      </div>

      <div className="manage-body">
        <Outlet />
      </div>
    </div>
  );
}
