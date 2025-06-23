import React from "react";
import slide1 from "../../assets/images/Slide1.jpg";
import { NavLink, Outlet } from "react-router-dom";
import "./artifactpage.scss";

export default function ArtifactPage() {
  return (
    <div className="page-artifact color-primary-bg ">
      <div className="page-header">
        <div className="overlay">
          <h1 className="header-text-top color-light-text ">HIỆN VẬT</h1>
          <div className="header-text color-light-text ">
            <NavLink to="/" className="color-light-text">
              Trang chủ
            </NavLink>
            <span className="separator color-light-text"> / </span>
            <NavLink to="/artifacts" className="color-light-text">
              Hiện vật
            </NavLink>
          </div>
        </div>
        <div className="container-image">
          <img
            src={slide1}
            className="d-block w-100 centered-image "
            alt="..."
          />
        </div>
      </div>
      <div className="page-body mt-4">
        <Outlet />
      </div>
    </div>
  );
}
