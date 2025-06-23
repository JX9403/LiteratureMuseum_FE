import React, { useEffect, useState } from "react";
import { createComment, fetchComments } from "../../api/CommentAPI";

export default function Comment({ targetId, targetType, userId }) {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);

  const loadComments = async () => {
    try {
      const res = await fetchComments({ targetType, targetId });
      setComments(res.content || []);
    } catch (err) {
      console.error("Lỗi khi lấy bình luận:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createComment({ targetType, targetId, content });
      setContent("");
      setReload(!reload);
    } catch (err) {
      console.error("Lỗi khi gửi bình luận:", err);
    }
  };

  useEffect(() => {
    if (targetId && targetType) {
      loadComments();
    }
  }, [targetId, targetType, reload]);

  return (
    <div className="comment-box mt-5">
      <h4 className="mb-4">Bình luận</h4>

      {userId ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Nhập bình luận..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Gửi bình luận
          </button>
        </form>
      ) : (
        <div className="alert alert-warning">
          Bạn cần đăng nhập để bình luận.
        </div>
      )}

      {comments.length === 0 ? (
        <p className="text-muted">Chưa có bình luận nào.</p>
      ) : (
        <div>
          {comments.map((cmt) => (
            <div
              key={cmt.id}
              className="border rounded p-3 mb-3"
              style={{
                background: "#f8f9fa",
                display: "block",

                minWidth: "250px",
              }}
            >
              <div className="d-flex justify-content-between mb-2">
                <strong>Người dùng #{cmt.userId}</strong>
                <small className="text-muted">
                  {new Date(cmt.createdAt || "").toLocaleString()}
                </small>
              </div>
              <p className="mb-0">{cmt.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
