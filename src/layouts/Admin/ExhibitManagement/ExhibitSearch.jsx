import React, { useState, useEffect } from "react";

export default function ExhibitSearch({ onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [sortOption, setSortOption] = useState("name,asc");
  const [type, setType] = useState("");

  // Gọi search mỗi khi type hoặc sortOption thay đổi
  useEffect(() => {
    onSearch(keyword, sortOption, type);
  }, [type, sortOption]);

  const handleSearch = () => {
    onSearch(keyword, sortOption, type);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="exhibit-search">
      <div className="rounded">
        <div className="container p-4">
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-5">
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
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">-- Loại trưng bày--</option>
                <option value="THUONGXUYEN">Thường xuyên</option>
                <option value="CHUYENDE">Chuyên đề</option>
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

            <div className="col-12 col-md-2 text-end">
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
