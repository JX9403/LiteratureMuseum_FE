import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserBlogSearch from "./UserBlogSearch";

import { getAllBlogByUser } from "../../api/BlogAPI";
import { LoginContext } from "../../context/LoginContext";
import { Pagi } from "../../components/Pagi/Pagi";
import { getUserByEmail } from "../../api/UserAPI";
import { formatDate } from "../../utils/formatDate";

export default function UserBlogTable() {
  const [blog, setBlog] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  const [showModal, setShowModal] = useState(false);

  const { user } = useContext(LoginContext);

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
  }, [user, account]);

  useEffect(() => {
    fetchBlog();
  }, [page, sort, account]);

  const fetchBlog = async () => {
    try {
      const data = await getAllBlogByUser({
        page: page,
        size: 10,
        sort: sort || "createdAt,desc",
        userId: account.id,
      });

      setBlog(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  const handleSearch = (searchText, sort) => {
    setPage(0);

    setSort(sort);
  };

  const pagi = (current) => {
    setPage(current);
  };

  return (
    <>
      <div className="manage-blog-table">
        <UserBlogSearch onSearch={handleSearch} />
        <div className="container d-flex ">
          <div
            className="btn btn-primary "
            onClick={() => navigate("/create-blog", { replace: true })}
          >
            Thêm mới
          </div>
        </div>

        <div className="container mt-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ width: "5%", textAlign: "center" }}>#</th>
                <th style={{ width: "40%" }}>Tên</th>

                <th style={{ width: "20%" }}>Trạng thái</th>
                <th style={{ width: "15%" }}>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {blog.map((n) => (
                <tr key={n.id}>
                  <th scope="row" style={{ textAlign: "center" }}>
                    <NavLink to={`/blog/${n.id}`}>{n.id}</NavLink>
                  </th>
                  <td>{n.name}</td>
                  <td>{n.status}</td>
                  <td>{formatDate(n.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagi current={page + 1} totalPages={totalPages} pagi={pagi} />

        <div
          className={`toast position-fixed top-0 end-0 m-3 text-white bg-${toastBg} show`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{
            zIndex: 9999,
            display: showToast ? "block" : "none",
            minWidth: "250px",
          }}
        >
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Xác nhận xóa</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Bạn có chắc chắn muốn xóa bài báo ID {blogToDelete}?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDelete(blogToDelete)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
