import http from "../utils/http";

export const createComment = async ({ targetType, targetId, content }) => {
  try {
    const res = await http.post(`/api/comments`, { targetType, targetId, content });
    return res.data;
  } catch (err) {
    console.error("Lỗi khi tạo bình luận:", err.response?.data);
    throw err.response?.data;
  }
};


export const fetchComments = async ({ targetType, targetId, page = 0, size = 10, sort = "createdAt,desc" }) => {
  try {
    const res = await http.get(`/api/comments/${targetType}/${targetId}`, {
      params: { page, size, sort }
    });
    return res.data; // là Page<CommentDTO>
  } catch (err) {
    console.error("Lỗi khi lấy danh sách bình luận:", err.response?.data);
    throw err.response?.data;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await http.delete(`/api/comments/${commentId}`);
  } catch (err) {
    console.error("Lỗi khi xóa bình luận:", err.response?.data);
    throw err.response?.data;
  }
};
