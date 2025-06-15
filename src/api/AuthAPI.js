import http from "../utils/http";

export const register = async ({ email, password }) => {
  try {
    const res = await http.post("/api/auth/register", { email, password });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    alert(err.response?.data.message);
    throw err.response?.data;

  }
};

export const confirmEmail = async ({ email, confirmationCode }) => {
  try {
    const res = await http.post("/api/auth/confirm-email", { email, confirmationCode });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response);
    alert(err.response?.data);
    throw err.response?.data;
  }
};

export const login = async ({ email, password }) => {
  try {
    const res = await http.post("/api/auth/login", { email, password });

    localStorage.setItem('token', res.data);

    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response);
    alert("Đăng nhập không thành công!");
    throw err.response;
  }
};

export const changePassword = async ({ currentPassword, newPassword }) => {
  try {
    const res = await http.post("/api/auth/change-password", { currentPassword, newPassword });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    alert(err.response?.data.message);
    throw err.response?.data;
  }
};