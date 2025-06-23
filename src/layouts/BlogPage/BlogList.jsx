import React, { useEffect, useState } from "react";
import BlogSearch from "../Admin/BlogManagement/BlogSearch";

import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "../../api/BlogAPI";
import BlogCard from "../../components/BlogCard/BlogCard";
import { Pagi } from "../../components/Pagi/Pagi";

export default function BlogList() {
  const [blog, setBlog] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchBlog();
  }, [page, searchText, sort]);

  const fetchBlog = async () => {
    try {
      const data = await getAllBlogs({
        page: page,
        size: 10,
        sort: sort || "name,asc",
        searchText: searchText || "",
      });

      // Lọc blog có status === "APPROVED"
      const approvedBlogs = data.content.filter((b) => b.status === "APPROVED");
      setBlog(approvedBlogs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  const handleSearch = (searchText, sort) => {
    setPage(0);
    setSearchText(searchText);
    setSort(sort);
  };

  const pagi = (current) => {
    setPage(current);
  };

  return (
    <>
      <div className="page-search p-4 color-search-bg container">
        <BlogSearch onSearch={handleSearch} />
      </div>

      <div className="page-list mb-4">
        <div className="container">
          <div className="row">
            {blog.map((blog, index) => (
              <BlogCard blog={blog} key={index} column={3} />
            ))}
          </div>
        </div>
      </div>

      <Pagi current={page + 1} totalPages={totalPages} pagi={pagi} />
    </>
  );
}
