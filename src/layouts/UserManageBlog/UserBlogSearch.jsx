import React, { useEffect, useState } from "react";
import "flatpickr/dist/flatpickr.min.css";

export default function UserBlogSearch({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("createdAt,desc");
  const [userId, setUserId] = useState("");

  const handleSearch = () => {
    onSearch(keyword, sortOption, userId);
  };

  useEffect(() => {
    onSearch(keyword, sortOption, userId);
  }, [sortOption]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="blog-search">
      <div className="rounded">
        <div className="container p-4">
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập từ khóa tìm kiếm ..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="col-12 col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Nhập userId..."
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="col-12 col-md-2">
              <select
                className="form-select"
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                }}
              >
                <option value="createdAt,desc">Mới nhất</option>
                <option value="createdAt,asc">Cũ nhất</option>
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
