import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RichTextWithImages from "../../../components/image/RichTextWithImages";
import { createAuthor } from "../../../api/AuthorAPI";
import { assignFileToTarget, uploadImage } from "../../../api/UploadAPI";
import { getAllAwards } from "../../../api/AwardAPI"; // Bạn cần có file này
import "react-quill/dist/quill.snow.css";

const AuthorCreate = () => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [deathYear, setDeathYear] = useState("");
  const [type, setType] = useState("WRITER");
  const [awardId, setAwardId] = useState("");
  const [awards, setAwards] = useState([]);

  const [content, setContent] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const data = await getAllAwards({
          page: 0,
          size: 10,
          sort: "name,asc",
          searchText: "",
        });
        console.log(data);
        setAwards(data.content);
      } catch (err) {
        console.error("❌ Lỗi khi tải danh sách giải thưởng:", err);
      }
    };
    fetchAwards();
  }, []);

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
      birthYear: birthYear ? parseInt(birthYear) : null,
      deathYear: deathYear ? parseInt(deathYear) : null,
      type,
      awardId: awardId ? parseInt(awardId) : null,
      content: htmlContent,
    };

    console.log("payload author: ", payload);

    try {
      const author = await createAuthor(payload);
      const newAuthorId = author.id;

      await Promise.all(
        imgs.map((img) =>
          assignFileToTarget({
            fileId: img.id,
            type: "AUTHOR",
            targetId: newAuthorId,
          })
        )
      );

      setToastBg("success");
      setToastMessage("Tạo tác giả thành công!");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate(`/admin/authors`);
      }, 2000);
    } catch (err) {
      console.error("❌ Lỗi khi tạo tác giả:", err);
      setToastBg("danger");
      setToastMessage(err.message || "Có lỗi xảy ra.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="container py-4 new-create">
      <div className="top-name d-flex justify-content-between align-items-center">
        <h4 className="mb-4 color-red-text font-w-500">Thêm tác giả</h4>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Tên tác giả</label>
        <textarea
          className="form-control"
          placeholder="Tên tác giả"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3 row">
        <div className="col-md-6">
          <label className="form-label">Năm sinh</label>
          <input
            type="number"
            min="0"
            className="form-control"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Năm mất</label>
          <input
            type="number"
            min="0"
            className="form-control"
            value={deathYear}
            onChange={(e) => setDeathYear(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Loại tác giả</label>
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="WRITER">Nhà văn</option>
          <option value="POET">Nhà thơ</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Giải thưởng</label>
        <select
          className="form-select"
          value={awardId}
          onChange={(e) => setAwardId(e.target.value)}
        >
          <option value="">-- Không chọn --</option>
          {awards.map((award) => (
            <option key={award.id} value={award.id}>
              {award.name}
            </option>
          ))}
        </select>
      </div>

      <div className="quill-content mb-3">
        <RichTextWithImages
          ref={editorRef}
          label="Nội dung"
          content={content}
          setContent={setContent}
          targetId="0"
          type="AUTHOR"
          uploadImage={uploadImage}
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-primary">
        Gửi dữ liệu
      </button>

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
  );
};

export default AuthorCreate;
