import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { createNews } from "../../../api/NewsAPI";
import { assignFileToTarget, uploadImage } from "../../../api/UploadAPI";
import RichTextWithImages from "../../../components/image/RichTextWithImages";

const NewsCreate = () => {
  const [name, setName] = useState("");

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
      name: name,
      content: htmlContent,
    };

    try {
      const news = await createNews(payload);
      const newNewsId = news.id;

      await Promise.all(
        imgs.map((img) =>
          assignFileToTarget({
            fileId: img.id,
            type: "NEWS",
            targetId: newNewsId,
          })
        )
      );

      setToastBg("success");
      setToastMessage("Cập nhật thành công!");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate(`/admin/news`);
      }, 2000);
    } catch (err) {
      console.error("❌ Lỗi khi tạo :", err);
      setToastBg("danger");
      setToastMessage(err.message);
      setShowToast(true);

      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="container py-4 new-create">
      {/* Basic inform */}
      <div className="top-name d-flex justify-content-between align-items-center">
        <h4 className="mb-4 color-red-text font-w-500">Thêm mới </h4>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Tiêu đề </label>
        <textarea
          className="form-control"
          placeholder="Tiêu đề"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="quill-content">
        <RichTextWithImages
          ref={editorRef}
          label="Nội dung"
          content={content}
          setContent={setContent}
          targetId="0"
          type="NEWS"
          uploadImage={uploadImage}
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-primary">
        Gửi dữ liệu
      </button>

      {/* Notice */}
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

export default NewsCreate;
