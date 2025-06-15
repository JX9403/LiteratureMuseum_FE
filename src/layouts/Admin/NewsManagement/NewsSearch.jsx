import React, { useEffect, useRef, useState } from "react";

import "flatpickr/dist/flatpickr.min.css";

export default function NewsSearch({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("createdAt,desc");

  const handleSearch = () => {
    // console.log(keyword, sortOption);
    onSearch(keyword, sortOption);
  };

  useEffect(() => {
    onSearch(keyword, sortOption);
  }, [sortOption]); // tự động gọi lại khi sortOption thay đổi

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // console.log("enter");
      handleSearch();
    }
  };

  return (
    <div className="news-search">
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
                onChange={(e) => {
                  setSortOption(e.target.value);
                }}
              >
                <option value="createdAt,desc">Mới nhất</option>
                <option value="createdAt,asc">Cũ nhất</option>
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
