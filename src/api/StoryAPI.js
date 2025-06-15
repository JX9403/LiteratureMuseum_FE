import http from "../utils/http";

export const createStory = async ({ name, content, authorId }) => {
  try {
    const res = await http.post("/api/stories", { name, content, authorId });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};

export const updateStory = async ({ id, name, content, authorId }) => {
  try {
    const res = await http.put(`/api/stories/${id}`, { name, content, authorId });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};



export const deleteStory = async (id) => {
  try {
    const res = await http.delete(`/api/stories/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi:", err.response?.data);
    throw err.response?.data;
  }
};

export const getStoryById = async (id) => {
  try {
    const res = await http.get(`/api/stories/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi: ", err.response?.data);
    throw err.response?.data;
  }
};


export const getAllStories = async (
  {
    page,
    size,
    sort,
    searchText,
    authorId
  }
) => {
  try {
    let url = `/api/stories?page=${page}&size=${size}`;

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


export const getAllStoryByAuthor = async (
  {
    authorId,
    page,
    size,
    sort
  }
) => {
  try {
    let url = `/api/stories/author/${authorId}?page=${page}&size=${size}`;

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



