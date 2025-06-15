import React from "react";
import { NavLink, useHref } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="d-flex sidebar flex-column flex-shrink-0 p-3 bg-light "
      style={{ width: "280px" }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/admin" end className="nav-link" aria-current="page">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Trang chủ
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/news" className="nav-link" aria-current="page">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Quản lý tin tức
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/awards" className="nav-link" aria-current="page">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Quản lý giải thưởng
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/exhibits"
            className="nav-link"
            aria-current="page"
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Quản lý trưng bày
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/blogs" className="nav-link" aria-current="page">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Quản lý blog
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/authors" className="nav-link" aria-current="page">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Quản lý tác giả
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/works" className="nav-link" aria-current="page">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Quản lý tác phẩm
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/stories" className="nav-link" aria-current="page">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Quản lý câu chuyện
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="nav-link" aria-current="page">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Quản lý người dùng
          </NavLink>
        </li>

        <hr />
        <li>
          <NavLink to="/admin/account" className="nav-link" aria-current="page">
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2" />
            </svg>
            Quản lý tài khoản
          </NavLink>
        </li>
      </ul>
      <hr />
    </div>
  );
}
