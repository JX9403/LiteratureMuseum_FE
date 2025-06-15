import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RichTextWithImages from "../../../components/image/RichTextWithImages";
import { createExhibit } from "../../../api/ExhibitAPI";
import { assignFileToTarget, uploadImage } from "../../../api/UploadAPI";
import "react-quill/dist/quill.snow.css";

const ExhibitCreate = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("THUONGXUYEN");
  const [content, setContent] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  const editorRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    let htmlContent = editorRef.current?.getContent() ?? "";

    htmlContent = `
      <div class="content-display">
        ${htmlContent}
      </div>
    `;

    const imgs = editorRef.current?.getImages() ?? [];

    const payload = {
      name,
      type,
      content: htmlContent,
    };

    try {
      const exhibit = await createExhibit(payload);
      const newExhibitId = exhibit.id;

      await Promise.all(
        imgs.map((img) =>
          assignFileToTarget({
            fileId: img.id,
            type: "EXHIBIT",
            targetId: newExhibitId,
          })
        )
      );

      setToastBg("success");
      setToastMessage("Tạo trưng bày thành công!");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate(`/admin/exhibits`);
      }, 2000);
    } catch (err) {
      console.error("❌ Lỗi khi tạo:", err);
      setToastBg("danger");
      setToastMessage(err.message || "Có lỗi xảy ra.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="container py-4 new-create">
      <div className="top-name d-flex justify-content-between align-items-center">
        <h4 className="mb-4 color-red-text font-w-500">Thêm trưng bày</h4>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Tên trưng bày</label>
        <input
          className="form-control"
          placeholder="Tên trưng bày"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Loại</label>
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="THUONGXUYEN">Thường xuyên</option>
          <option value="CHUYENDE">Chuyên đề</option>
        </select>
      </div>

      <div className="quill-content mb-3">
        <RichTextWithImages
          ref={editorRef}
          label="Nội dung"
          content={content}
          setContent={setContent}
          targetId="0"
          type="EXHIBIT"
          uploadImage={uploadImage}
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-primary">
        Gửi dữ liệu
      </button>

      {/* Toast thông báo */}
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

export default ExhibitCreate;
