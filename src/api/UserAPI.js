import http from "../utils/http";

export const getAllUsers = async (
  {
    page,
    size,
    sort,
    searchText
  }
) => {
  try {
    let url = `/api/users?page=${page}&size=${size}`;

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

export const getUserByEmail = async (email) => {
  try {
    const res = await http.get(`/api/users/email?email=${email}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi: ", err.response?.data);
    throw err.response?.data;
  }
};