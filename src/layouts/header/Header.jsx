import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/cropped-logo-.png";
import "./header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";
import { getUserByEmail } from "../../api/UserAPI";

export default function Header() {
  const { logout, user } = useContext(LoginContext);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const fetchUserByEmail = async () => {
    try {
      const data = await getUserByEmail(user);
      setAccount(data);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserByEmail();
    }
  }, [user]);

  console.log("User login", account);

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

            {account && account.role === "ADMIN" && (
              <>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item "
                      onClick={() => navigate("/admin")}
                    >
                      Trang quản trị
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() =>
                        navigate("/change-password", { state: { account } })
                      }
                    >
                      Đổi mật khẩu
                    </button>
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={logout}
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </>
            )}

            {account && account.role === "USER" && (
              <>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item "
                      onClick={() => navigate("/manage-blog")}
                    >
                      Quản lý bài đăng
                    </button>
                  </li>

                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() =>
                        navigate("/change-password", { state: { account } })
                      }
                    >
                      Đổi mật khẩu
                    </button>
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={logout}
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        ) : (
          <div className="text-end">
            <NavLink to="/login">ĐĂNG NHẬP</NavLink> |
            <NavLink to="/register">ĐĂNG KÝ</NavLink>
          </div>
        )}
      </div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                <NavLink className="nav-link" to="/">
                  TRANG CHỦ
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/introduction">
                  GIỚI THIỆU
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/news">
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
                    <NavLink className="dropdown-item" to="/authors">
                      Tác giả
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/works">
                      Tác phẩm
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/stories">
                      Câu chuyện
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/awards">
                  GIẢI THƯỞNG
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/exhibits">
                  TRƯNG BÀY
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/artifacts">
                  HIỆN VẬT
                </NavLink>
              </li>

              <li className="nav-item me-3">
                <NavLink className="nav-link" to="/blogs">
                  DIỄN ĐÀN THẢO LUẬN
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
