import http from "../utils/http";

export const createExhibit = async ({ name, content, type }) => {
  try {
    const res = await http.post("/api/exhibits", { name, content, type });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};

export const updateExhibit = async ({ id, name, content, type }) => {
  try {
    const res = await http.put(`/api/exhibits/${id}`, { name, content, type });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};



export const deleteExhibit = async (id) => {
  try {
    const res = await http.delete(`/api/exhibits/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi:", err.response?.data);
    throw err.response?.data;
  }
};

export const getExhibitById = async (id) => {
  try {
    const res = await http.get(`/api/exhibits/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi: ", err.response?.data);
    throw err.response?.data;
  }
};


export const getAllExhibits = async (
  {
    page,
    size,
    sort,
    searchText,
    type
  }
) => {
  try {
    let url = `/api/exhibits?page=${page}&size=${size}`;

    if (sort) {
      url += `&sort=${sort}`;
    }
    if (searchText) {
      url += `&search=${searchText}`;
    }
    if (type) {
      url += `&type=${type}`;
    }

    const res = await http.get(url);
    return res.data;
  } catch (err) {
    console.error("Lỗi : ", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};




