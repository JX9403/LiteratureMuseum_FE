import React, { useContext } from "react";

import logo from "../../assets/images/cropped-logo-.png";
import "./header.scss";
import { NavLink } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
export default function Header() {
  const { logout, user } = useContext(LoginContext);

  return (
    <div className="header color-primary-bg">
      <div className="header-top color-red-bg color-yellow-text d-flex justify-content-between">
        <div className="text-start">BẢO TÀNG VĂN HỌC VIỆT NAM</div>
        {user ? (
          <div className="dropdown text-end">
            {user}
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></button>

            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="userDropdown"
            >
              <li>
                <button className="dropdown-item text-danger" onClick={logout}>
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="text-end">
            <NavLink to="/login">ĐĂNG NHẬP</NavLink> |
            <NavLink to="/register">ĐĂNG KÝ</NavLink>
          </div>
        )}
      </div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img className="header-logo" src={logo} alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item me-3">
                <NavLink className="nav-link" aria-current="page" to="/">
                  TRANG CHỦ
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/introduction"
                >
                  GIỚI THIỆU
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link " aria-current="page" to="/news">
                  TIN TỨC
                </NavLink>
              </li>
              <li className="nav-item me-3 dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  DANH MỤC
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item "
                      aria-current="page"
                      to="/authors"
                    >
                      Tác giả
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item "
                      aria-current="page"
                      to="/works"
                    >
                      Tác phẩm
                    </NavLink>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Câu chuyện
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item me-3">
                <NavLink className="nav-link " aria-current="page" to="/map">
                  BẢN ĐỒ VĂN HỌC
                </NavLink>
              </li>

              <li className="nav-item me-3 dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  TRƯNG BÀY
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      className="dropdown-item "
                      aria-current="page"
                      to="#"
                    >
                      Thường xuyên
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item "
                      aria-current="page"
                      to="/news"
                    >
                      Chuyên đề
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item me-3">
                <a className="nav-link" aria-current="page" href="#">
                  BẢNG XẾP HẠNG
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
