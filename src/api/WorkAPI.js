import http from "../utils/http";

export const createWork = async ({ name, content, authorId }) => {
  try {
    const res = await http.post("/api/works", { name, content, authorId });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};

export const updateWork = async ({ id, name, content, authorId }) => {
  try {
    const res = await http.put(`/api/works/${id}`, { name, content, authorId });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};



export const deleteWork = async (id) => {
  try {
    const res = await http.delete(`/api/works/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi:", err.response?.data);
    throw err.response?.data;
  }
};

export const getWorkById = async (id) => {
  try {
    const res = await http.get(`/api/works/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi: ", err.response?.data);
    throw err.response?.data;
  }
};


export const getAllWorks = async (
  {
    page,
    size,
    sort,
    searchText,
    authorId
  }
) => {
  try {
    let url = `/api/works?page=${page}&size=${size}`;

    if (sort) {
      url += `&sort=${sort}`;
    }
    if (searchText) {
      url += `&search=${searchText}`;
    }
    if (authorId) {
      url += `&authorId=${authorId}`;
    }

    const res = await http.get(url);
    return res.data;
  } catch (err) {
    console.error("Lỗi : ", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};


export const getAllWorkByAuthor = async (
  {
    authorId,
    page,
    size,
    sort
  }
) => {
  try {
    let url = `/api/works/author/${authorId}?page=${page}&size=${size}`;

    if (sort) {
      url += `&sort=${sort}`;
    }

    const res = await http.get(url);
    return res.data;
  } catch (err) {
    console.error("Lỗi : ", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};



