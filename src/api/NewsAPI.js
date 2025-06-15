import http from "../utils/http";

export const createNews = async ({ name, content }) => {
  try {
    const res = await http.post("/api/news", { name, content });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};

export const updateNews = async ({ id, name, content }) => {
  try {
    const res = await http.put(`/api/news/${id}`, { name, content });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};



export const deleteNews = async (id) => {
  try {
    const res = await http.delete(`/api/news/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi:", err.response?.data);
    throw err.response?.data;
  }
};

export const getNewsById = async (id) => {
  try {
    const res = await http.get(`/api/news/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi: ", err.response?.data);
    throw err.response?.data;
  }
};


export const getAllNews = async (
  {
    page,
    size,
    sort,
    searchText
  }
) => {
  try {
    let url = `/api/news?page=${page}&size=${size}`;

    if (sort) {
      url += `&sort=${sort}`;
    }
    if (searchText) {
      url += `&search=${searchText}`;
    }

    const res = await http.get(url);
    return res.data;
  } catch (err) {
    console.error("Lỗi : ", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};




