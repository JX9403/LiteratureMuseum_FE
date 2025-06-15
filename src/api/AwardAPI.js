import http from "../utils/http";

export const createAward = async ({ name, description }) => {
  try {
    const res = await http.post("/api/awards", { name, description });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};

export const updateAward = async ({ id, name, description }) => {
  try {
    const res = await http.put(`/api/awards/${id}`, { name, description });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};



export const deleteAward = async (id) => {
  try {
    const res = await http.delete(`/api/awards/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi:", err.response?.data);
    throw err.response?.data;
  }
};

export const getAwardById = async (id) => {
  try {
    const res = await http.get(`/api/awards/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi: ", err.response?.data);
    throw err.response?.data;
  }
};


export const getAllAwards = async (
  {
    page,
    size,
    sort,
    searchText
  }
) => {
  try {
    let url = `/api/awards?page=${page}&size=${size}`;

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




