import http from "../utils/http";

export const createAuthor = async ({ name, content, birthYear, deathYear, type, awardId }) => {
  try {
    const res = await http.post("/api/authors", { name, content, birthYear, deathYear, type, awardId });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};

export const updateAuthor = async ({ id, name, content, birthYear, deathYear, type }) => {
  try {
    const res = await http.put(`/api/authors/${id}`, { name, content, birthYear, deathYear, type });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};



export const deleteAuthor = async (id) => {
  try {
    const res = await http.delete(`/api/authors/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi:", err.response?.data);
    throw err.response?.data;
  }
};

export const getAuthorById = async (id) => {
  try {
    const res = await http.get(`/api/authors/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi: ", err.response?.data);
    throw err.response?.data;
  }
};


export const getAllAuthors = async (
  {
    page,
    size,
    sort,
    searchText
  }
) => {
  try {
    let url = `/api/authors?page=${page}&size=${size}`;

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

export const getAllAuthorByAward = async (
  {
    awardId,
    page,
    size,
    sort
  }
) => {
  try {
    let url = `/api/authors/award/${awardId}?page=${page}&size=${size}`;

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


