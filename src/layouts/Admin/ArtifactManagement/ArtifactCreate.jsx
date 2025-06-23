import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createArtifact } from "../../../api/ArtifactAPI";
import {
  assignFileToTarget,
  uploadFile,
  uploadImage,
} from "../../../api/UploadAPI";
import RichTextWithImages from "../../../components/image/RichTextWithImages";

const ArtifactCreate = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [modelFile, setModelFile] = useState(null);
  const [usdzFile, setUsdzFile] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  const editorRef = useRef(null);
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    formData.append("type", "ARTIFACT");
    formData.append("targetId", "0"); // tạm thời

    const res = await uploadFile(formData);
    return {
      fileUrl: res.fileUrl,
      fileId: res.id,
    };
  };

  const handleSubmit = async () => {
    let htmlContent = editorRef.current?.getContent() ?? "";

    htmlContent = `
      <div class="content-display">
        ${htmlContent}
      </div>
    `;

    const imgs = editorRef.current?.getImages() ?? [];

    try {
      // 1. Upload model + usdz nếu có
      let modelUrl = "";
      let modelId = null;
      if (modelFile) {
        const result = await handleFileUpload(modelFile);
        modelUrl = result.fileUrl;
        modelId = result.fileId;
      }

      let usdzUrl = "";
      let usdzId = null;
      if (usdzFile) {
        const result = await handleFileUpload(usdzFile);
        usdzUrl = result.fileUrl;
        usdzId = result.fileId;
      }

      // 2. Gửi nội dung artifact
      const payload = {
        name,
        content: htmlContent,
        model: modelUrl,
        usdz: usdzUrl,
        view: 0,
      };

      const artifact = await createArtifact(payload);
      const artifactId = artifact.id;

      // 3. Gán ảnh trong nội dung
      await Promise.all(
        imgs.map((img) =>
          assignFileToTarget({
            fileId: img.id,
            type: "ARTIFACT",
            targetId: artifactId,
          })
        )
      );

      // 4. Gán file model + usdz
      const additionalFiles = [{ id: modelId }, { id: usdzId }].filter(
        (f) => f.id
      );

      await Promise.all(
        additionalFiles.map((file) =>
          assignFileToTarget({
            fileId: file.id,
            type: "ARTIFACT",
            targetId: artifactId,
          })
        )
      );

      setToastBg("success");
      setToastMessage("Tạo hiện vật thành công!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/admin/artifacts");
      }, 2000);
    } catch (err) {
      setToastBg("danger");
      setToastMessage(err.message || "Có lỗi xảy ra");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="container py-4 new-create">
      <div className="top-name d-flex justify-content-between align-items-center">
        <h4 className="mb-4 color-red-text font-w-500">Thêm mới hiện vật</h4>
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

      <div className="quill-content mb-3">
        <RichTextWithImages
          ref={editorRef}
          label="Nội dung"
          content={content}
          setContent={setContent}
          targetId="0"
          type="ARTIFACT"
          uploadImage={uploadImage}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tải file mô hình (.glb)</label>
        <input
          type="file"
          accept=".glb"
          className="form-control"
          onChange={(e) => setModelFile(e.target.files[0])}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Tải file AR (.usdz)</label>
        <input
          type="file"
          accept=".usdz"
          className="form-control"
          onChange={(e) => setUsdzFile(e.target.files[0])}
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

export default ArtifactCreate;
