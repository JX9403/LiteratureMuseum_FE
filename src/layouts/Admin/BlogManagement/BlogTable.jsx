import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Pagi } from "../../../components/Pagi/Pagi";
import { deleteBlog, getAllBlogs, updateBlog } from "../../../api/BlogAPI";
import BlogSearch from "./BlogSearch";
import { formatDate } from "../../../utils/formatDate";

const STATUS_OPTIONS = ["PENDING", "APPROVED", "REJECTED"];

export default function BlogTable() {
  const [blog, setBlog] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  const [showModal, setShowModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [page, searchText, sort]);

  const fetchBlog = async () => {
    try {
      const data = await getAllBlogs({
        page: page,
        size: 10,
        sort: sort || "createdAt,desc",
        searchText: searchText || "",
      });
      setBlog(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  const handleSearch = (searchText, sort) => {
    setPage(0);
    setSearchText(searchText);
    setSort(sort);
  };

  const handleDelete = (id) => {
    setBlogToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteBlog(id);
      setBlog(blog.filter((n) => n.id !== id));
      showSuccessToast("Xóa thành công!");
    } catch (error) {
      showErrorToast(error.message);
    }
    setShowModal(false);
    setBlogToDelete(null);
  };

  const handleStatusChange = async (blogItem, newStatus) => {
    try {
      const result = await updateBlog({
        id: blogItem.id,
        name: blogItem.name,
        content: blogItem.content,
        status: newStatus,
        userId: blogItem.userId,
      });
      setBlog((prev) => prev.map((b) => (b.id === blogItem.id ? result : b)));
      showSuccessToast("Cập nhật trạng thái thành công!");
    } catch (err) {
      showErrorToast("Cập nhật thất bại!");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "btn-warning";
      case "APPROVED":
        return "btn-success";
      case "REJECTED":
        return "btn-danger";
      default:
        return "btn-secondary";
    }
  };

  const showSuccessToast = (msg) => {
    setToastBg("success");
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const showErrorToast = (msg) => {
    setToastBg("danger");
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const pagi = (current) => {
    setPage(current);
  };

  return (
    <>
      <div className="manage-blog-table">
        <BlogSearch onSearch={handleSearch} />
        <div
          className="btn btn-primary"
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/admin/blogs/create")}
        >
          Thêm mới
        </div>

        <div className="container mt-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ width: "5%", textAlign: "center" }}>#</th>
                <th style={{ width: "30%" }}>Tên</th>
                <th style={{ width: "15%" }}>Ngày đăng</th>
                <th style={{ width: "20%" }}>Trạng thái</th>
                <th style={{ width: "10%", textAlign: "center" }}>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {blog.map((n) => (
                <tr key={n.id}>
                  <th scope="row" style={{ textAlign: "center" }}>
                    <NavLink to={`/blogs/${n.id}`}>{n.id}</NavLink>
                  </th>
                  <td>{n.name}</td>
                  <td>{formatDate(n.createdAt)}</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className={`btn dropdown-toggle ${getStatusClass(
                          n.status
                        )}`}
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {n.status}
                      </button>
                      <ul className="dropdown-menu">
                        {STATUS_OPTIONS.map((status) => (
                          <li key={status}>
                            <button
                              className="dropdown-item"
                              onClick={() => handleStatusChange(n, status)}
                              disabled={n.status === status}
                            >
                              {status}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(n.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagi current={page + 1} totalPages={totalPages} pagi={pagi} />

        {/* Toast */}
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

      {/* Modal xác nhận xóa */}
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
