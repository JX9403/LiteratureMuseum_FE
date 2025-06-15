import React, {
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactQuill from "react-quill";

const RichTextWithImages = forwardRef(
  ({ label, content, setContent, targetId, type, uploadImage }, ref) => {
    const [images, setImages] = useState([]);
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageDesc, setImageDesc] = useState("");
    const [imageDescError, setImageDescError] = useState("");

    const quillRef = useRef(null);
    const selectionRef = useRef(null);

    const modules = useMemo(
      () => ({
        toolbar: {
          container: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ align: ["", "justify", "center", "right"] }],
          ],
          handlers: {
            image: () => {
              const editor = quillRef.current?.getEditor();
              const range = editor?.getSelection();
              selectionRef.current = range;
              setShowImageModal(true);
            },
          },
        },
      }),
      []
    );

    const formats = [
      "bold",
      "italic",
      "underline",
      "list",
      "bullet",
      "link",
      "image",
      "size",
      "align",
    ];

    useImperativeHandle(ref, () => ({
      getContent: () => content,
      getImages: () => images,
      setInitialContent: (html, imgs) => {
        setContent?.(html);
        setImages(imgs);
      },
    }));

    const handleImageInsert = async () => {
      setImageDescError("");

      if (!imageFile) {
        alert("Vui lòng chọn ảnh.");
        return;
      }
      if (!imageDesc.trim()) {
        setImageDescError("Vui lòng nhập mô tả ảnh");
        return;
      }

      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("name", imageFile.name);
      formData.append("type", type);
      formData.append("targetId", targetId !== null ? targetId.toString() : "");
      formData.append("description", imageDesc);

      try {
        const data = await uploadImage(formData);

        const uploadedUrl = data.fileUrl;
        const imageDesc = data.description;
        const id = data.id;

        const editor = quillRef.current?.getEditor();
        const range = selectionRef.current;
        if (!editor || !range) {
          alert("Vui lòng đặt con trỏ vào vị trí cần chèn ảnh.");
          return;
        }

        const imgHTML = `
          <div class="heloworlf" data-url="${uploadedUrl}">
            <img
              src="${uploadedUrl}"
              alt="${imageDesc}"
              style="width: 100%; height: auto; display: block;"
            />
            <div >
              ${imageDesc}
            </div>
          </div>
        `;

        editor.clipboard.dangerouslyPasteHTML(range.index, imgHTML);
        editor.setSelection(range.index + 1);

        setImages((prev) => [
          ...prev,
          {
            id: id,
            url: uploadedUrl,
            description: imageDesc,
          },
        ]);
        setContent?.(editor.root.innerHTML);

        setShowImageModal(false);
        setImageFile(null);
        setImageDesc("");
      } catch (error) {
        alert("Upload ảnh thất bại.");
      }
    };

    const handleDeleteImage = (imgToDelete) => {
      const editor = quillRef.current?.getEditor();
      if (!editor) return;

      let html = editor.root.innerHTML;

      const escapeForRegExp = (str) =>
        str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const urlEsc = escapeForRegExp(imgToDelete.url);

      const regex = new RegExp(
        `<p[^>]*>\\s*<img[^>]*src="${urlEsc}"[^>]*>.*?<\\/p>`,
        "g"
      );

      html = html.replace(regex, "");

      editor.clipboard.dangerouslyPasteHTML(0, html);

      setContent?.(html);
      setImages((prev) => prev.filter((img) => img.url !== imgToDelete.url));
    };

    return (
      <>
        {label && <label className="form-label">{label}</label>}
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
        />

        {showImageModal && (
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Upload ảnh</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowImageModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Chọn ảnh</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setImageFile(file);
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mô tả ảnh</label>
                    <input
                      type="text"
                      className={`form-control ${
                        imageDescError ? "is-invalid" : ""
                      }`}
                      value={imageDesc}
                      onChange={(e) => setImageDesc(e.target.value)}
                    />
                    {imageDescError && (
                      <div className="invalid-feedback">{imageDescError}</div>
                    )}
                  </div>
                  {imageFile && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="preview"
                        className="img-fluid"
                      />
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowImageModal(false)}
                  >
                    Hủy
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleImageInsert}
                  >
                    Upload & Chèn ảnh
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

export default RichTextWithImages;
