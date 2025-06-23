import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Pagi } from "../../../components/Pagi/Pagi";
import { deleteExhibit, getAllExhibits } from "../../../api/ExhibitAPI";
import ExhibitSearch from "./ExhibitSearch";
import { formatDate } from "../../../utils/formatDate";

export default function ExhibitTable() {
  const [exhibit, setExhibit] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");

  const [type, setType] = useState("");

  const [searchText, setSearchText] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  const [showModal, setShowModal] = useState(false);
  const [exhibitToDelete, setExhibitToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchExhibit();
  }, [page, searchText, sort, type]);

  const fetchExhibit = async () => {
    try {
      const data = await getAllExhibits({
        page: page,
        size: 10,
        sort: sort || "name,desc",
        searchText: searchText || "",
        type: type || "",
      });

      setExhibit(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  const handleSearch = (searchText, sort, type) => {
    console.log("from table: ", { searchText, sort, type });
    setPage(0);
    setSearchText(searchText);
    setSort(sort);
    setType(type);
  };

  const handleDelete = (id) => {
    try {
      setExhibitToDelete(id);
      setShowModal(true);
    } catch (err) {
      console.error("❌ Lỗi :", err);
    }
  };

  const confirmDelete = async (id) => {
    try {
      await deleteExhibit(id);
      setExhibit(exhibit.filter((n) => n.id !== id));
      setToastBg("success");
      setToastMessage("Cập nhật thành công!");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      setToastBg("danger");
      setToastMessage(error.message);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    setShowModal(false);
    setExhibitToDelete(null);
  };

  const pagi = (current) => {
    setPage(current);
  };

  return (
    <>
      <div className="manage-exhibit-table">
        <ExhibitSearch onSearch={handleSearch} />
        <div
          className="btn btn-primary "
          style={{ "margin-left": "10px" }}
          onClick={() => navigate("/admin/exhibits/create")}
        >
          Thêm mới
        </div>

        <div className="container mt-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ width: "10%", textAlign: "center" }}>#</th>
                <th style={{ width: "50%" }}>Tên </th>
                <th style={{ width: "30%" }}>Loại </th>
                <th style={{ width: "10%", textAlign: "center" }}>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {exhibit.map((n) => (
                <tr key={n.id}>
                  <th scope="row" style={{ textAlign: "center" }}>
                    <NavLink to={`/exhibits/${n.id}`}>{n.id}</NavLink>
                  </th>
                  <td>{n.name}</td>
                  <td>{n.type}</td>
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
                  <p>Bạn có chắc chắn muốn xóa bài báo ID {exhibitToDelete}?</p>
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
                    onClick={() => confirmDelete(exhibitToDelete)}
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
