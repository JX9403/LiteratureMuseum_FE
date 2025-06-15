import http from "../utils/http";

export const createArtifact = async ({ name, content, model, url, usdz }) => {
  try {
    const res = await http.post("/api/artifacts", { name, content, model, url, usdz });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};

export const updateArtifact = async ({ id, name, content, model, url, usdz }) => {
  try {
    const res = await http.put(`/api/artifacts/${id}`, { name, content, model, url, usdz });
    return res.data;
  } catch (err) {
    console.error("Lỗi :", err.response?.data);
    throw err.response?.data;
  }
};



export const deleteArtifact = async (id) => {
  try {
    const res = await http.delete(`/api/artifacts/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi:", err.response?.data);
    throw err.response?.data;
  }
};

export const getArtifactById = async (id) => {
  try {
    const res = await http.get(`/api/artifacts/${id}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi: ", err.response?.data);
    throw err.response?.data;
  }
};


export const getAllArtifact = async (
  {
    page,
    size,
    sort,
    searchText
  }
) => {
  try {
    let url = `/api/artifacts?page=${page}&size=${size}`;

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




