import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAward } from "../../../api/AwardAPI";

const AwardCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = { name, description };

    try {
      await createAward(payload);

      setToastBg("success");
      setToastMessage("Tạo giải thưởng thành công!");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/admin/awards");
      }, 2000);
    } catch (err) {
      console.error("❌ Lỗi khi tạo:", err);
      setToastBg("danger");
      setToastMessage(err.message || "Đã có lỗi xảy ra!");
      setShowToast(true);

      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="container py-4 new-create">
      <div className="top-name d-flex justify-content-between align-items-center">
        <h4 className="mb-4 color-red-text font-w-500">Thêm mới giải thưởng</h4>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Tên giải thưởng</label>
        <input
          className="form-control"
          placeholder="Nhập tên giải thưởng"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Mô tả</label>
        <textarea
          className="form-control"
          placeholder="Mô tả ngắn về giải thưởng"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-primary">
        Gửi dữ liệu
      </button>

      {/* Thông báo */}
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
  );
};

export default AwardCreate;
