import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "react-quill/dist/quill.snow.css";
import { getUserByEmail } from "../../api/UserAPI";
import RichTextWithImages from "../../components/image/RichTextWithImages";
import { LoginContext } from "../../context/LoginContext";
import { assignFileToTarget, uploadImage } from "../../api/UploadAPI";
import { createBlog } from "../../api/BlogAPI";

const UserBlogCreate = () => {
  const { user } = useContext(LoginContext);
  const [userId, setUserId] = useState(null);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  const editorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserByEmail(user);
        setUserId(data.id);
      } catch (err) {
        console.error("Không lấy được thông tin user:", err);
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!userId) {
      setToastBg("danger");
      setToastMessage("Không xác định được người dùng.");
      setShowToast(true);
      return;
    }

    let htmlContent = editorRef.current?.getContent() ?? "";
    htmlContent = `<div class="content-display">${htmlContent}</div>`;

    const imgs = editorRef.current?.getImages() ?? [];

    const payload = {
      name,
      content: htmlContent,
      status: "PENDING", // Gửi mặc định
      userId, // Gửi userId
    };

    try {
      const blog = await createBlog(payload);
      const newBlogId = blog.id;

      await Promise.all(
        imgs.map((img) =>
          assignFileToTarget({
            fileId: img.id,
            type: "BLOG",
            targetId: newBlogId,
          })
        )
      );

      setToastBg("success");
      setToastMessage("Tạo blog thành công!");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate(`/manage-blog`);
      }, 2000);
    } catch (err) {
      console.error("❌ Lỗi khi tạo blog:", err);
      setToastBg("danger");
      setToastMessage(err.message || "Có lỗi xảy ra.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="container py-4 new-create">
      <div className="top-name d-flex justify-content-between align-items-center">
        <h4 className="mb-4 color-red-text font-w-500">Thêm mới Blog</h4>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>

      <div className="mb-3">
        <label className="form-label">Tiêu đề</label>
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
          type="BLOG"
          uploadImage={uploadImage}
        />
      </div>

      <button onClick={handleSubmit} className="btn btn-primary mt-4">
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

export default UserBlogCreate;
