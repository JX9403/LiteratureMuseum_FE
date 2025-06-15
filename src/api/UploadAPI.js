import http from "../utils/http";

export const uploadImage = async (formData) => {
  try {
    const res = await http.post("/api/file/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};

export const assignFileToTarget = async ({ fileId, type, targetId }) => {
  try {
    const res = await http.put(`/api/file/${fileId}/assign`, { type, targetId });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};


