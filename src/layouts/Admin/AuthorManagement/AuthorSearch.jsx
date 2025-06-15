import React, { useEffect, useState } from "react";
import "flatpickr/dist/flatpickr.min.css";

export default function AuthorSearch({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("name,asc");

  useEffect(() => {
    onSearch(keyword, sortOption);
  }, [sortOption]); // tự động gọi lại khi sortOption thay đổi

  const handleSearch = () => {
    onSearch(keyword, sortOption);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="author-search">
      <div className="rounded">
        <div className="container p-4">
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập để tìm kiếm ..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="col-12 col-md-2 ">
              <select
                className="form-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="name,asc">A - Z </option>
                <option value="name,desc">Z - A</option>
              </select>
            </div>

            <div className="col-12 col-md-2  text-end">
              <button
                className="btn btn-primary w-100 w-lg-auto mt-3 mt-lg-0"
                onClick={handleSearch}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
