import React, { useEffect, useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import { getAllAuthors } from "../../../api/AuthorAPI";

export default function WorkSearch({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("name,asc");
  const [authorId, setAuthorId] = useState("");
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    // Gọi API lấy danh sách tác giả
    const fetchAuthors = async () => {
      try {
        const res = await getAllAuthors({
          page: 0,
          size: 100,
          sort: "name,asc",
          searchText: "",
        });
        setAuthors(res.content);
      } catch (err) {
        console.error("❌ Lỗi khi tải tác giả:", err);
      }
    };
    fetchAuthors();
  }, []);

  useEffect(() => {
    onSearch(keyword, sortOption, authorId);
  }, [sortOption, authorId]);

  const handleSearch = () => {
    onSearch(keyword, sortOption, authorId);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="work-search">
      <div className="rounded">
        <div className="container p-4">
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập để tìm kiếm ..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="col-12 col-md-3">
              <select
                className="form-select"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
              >
                <option value="">-- Tất cả tác giả --</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-2">
              <select
                className="form-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="name,asc">A - Z</option>
                <option value="name,desc">Z - A</option>
              </select>
            </div>

            <div className="col-12 col-md-1 text-end">
              <button
                className="btn btn-primary w-100 w-lg-auto mt-3 mt-lg-0"
                onClick={handleSearch}
              >
                Tìm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
