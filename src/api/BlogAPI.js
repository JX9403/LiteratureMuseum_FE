import http from "../utils/http";

export const createBlog = async ({ name, content, status, userId }) => {
  try {
    const res = await http.post("/api/blogs", { name, content, status, userId });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};

export const updateBlog = async ({ id, name, content, status, userId }) => {
  try {
    const res = await http.put(`/api/blogs/${id}`, { name, content, status, userId });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};



export const deleteBlog = async (id) => {
  try {
    const res = await http.delete(`/api/blogs/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi:", err.response?.data);
    throw err.response?.data;
  }
};

export const getBlogById = async (id) => {
  try {
    const res = await http.get(`/api/blogs/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi: ", err.response?.data);
    throw err.response?.data;
  }
};


export const getAllBlogs = async (
  {
    page,
    size,
    sort,
    searchText,
    userId
  }
) => {
  try {
    let url = `/api/blogs?page=${page}&size=${size}`;

    if (sort) {
      url += `&sort=${sort}`;
    }
    if (searchText) {
      url += `&search=${searchText}`;
    }
    if (userId
    ) {
      url += `&userId=${userId}`;
    }

    const res = await http.get(url);
    return res.data;
  } catch (err) {
    console.error("Lỗi : ", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

export const getAllBlogByUser = async (
  {
    userId,
    page,
    size,
    sort
  }
) => {
  try {
    let url = `/api/blogs/user/${userId}?page=${page}&size=${size}`;

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


