import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RichTextWithImages from "../../../components/image/RichTextWithImages";
import { createStory } from "../../../api/StoryAPI";
import { assignFileToTarget, uploadImage } from "../../../api/UploadAPI";
import { getAllStories } from "../../../api/StoryAPI"; // gọi tác giả
import "react-quill/dist/quill.snow.css";
import { getAllAuthors } from "../../../api/AuthorAPI";

const StoryCreate = () => {
  const [name, setName] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authors, setAuthors] = useState([]);
  const [content, setContent] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const data = await getAllAuthors({
          page: 0,
          size: 10,
          sort: "name,asc",
          searchText: "",
        });
        setAuthors(data.content);
      } catch (err) {
        console.error("❌ Lỗi khi tải danh sách tác giả:", err);
      }
    };
    fetchAuthors();
  }, []);

  const handleSubmit = async () => {
    let htmlContent = editorRef.current?.getContent() ?? "";

    htmlContent = `<div class="content-display">${htmlContent}</div>`;
    const imgs = editorRef.current?.getImages() ?? [];

    const payload = {
      name,
      content: htmlContent,
      authorId: authorId ? parseInt(authorId) : null,
    };

    try {
      const story = await createStory(payload);
      const newStoryId = story.id;

      await Promise.all(
        imgs.map((img) =>
          assignFileToTarget({
            fileId: img.id,
            type: "STORY",
            targetId: newStoryId,
          })
        )
      );

      setToastBg("success");
      setToastMessage("Tạo câu chuyện thành công!");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate(`/admin/stories`);
      }, 2000);
    } catch (err) {
      console.error("❌ Lỗi khi tạo câu chuyện:", err);
      setToastBg("danger");
      setToastMessage(err.message || "Có lỗi xảy ra.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="container py-4 new-create">
      <div className="top-name d-flex justify-content-between align-items-center">
        <h4 className="mb-4 color-red-text font-w-500">Thêm mới</h4>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Tên</label>
        <input
          type="text"
          className="form-control"
          placeholder="Tên câu chuyện"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tác giả</label>
        <select
          className="form-select"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option value="">-- Chọn tác giả --</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
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
          type="STORY"
          uploadImage={uploadImage}
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-primary">
        Gửi dữ liệu
      </button>

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

export default StoryCreate;
