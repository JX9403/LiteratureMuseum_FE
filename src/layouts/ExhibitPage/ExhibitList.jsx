import React, { useEffect, useState } from "react";
import ExhibitSearch from "../Admin/ExhibitManagement/ExhibitSearch";

import { useNavigate } from "react-router-dom";
import { getAllExhibits } from "../../api/ExhibitAPI";
import ExhibitCard from "../../components/ExhibitCard/ExhibitCard";
import { Pagi } from "../../components/Pagi/Pagi";

export default function ExhibitList() {
  const [exhibit, setExhibit] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetchExhibit();
  }, [page, searchText, sort, type]);

  const fetchExhibit = async () => {
    try {
      const data = await getAllExhibits({
        page: page,
        size: 10,
        sort: sort || "name,asc",
        searchText: searchText || "",
        type: type || "",
      });

      setExhibit(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  const handleSearch = (searchText, sort, type) => {
    console.log("from list: ", { searchText, sort, type });
    setPage(0);
    setSearchText(searchText);
    setSort(sort);
    setType(type);
  };

  const pagi = (current) => {
    setPage(current);
  };
  return (
    <>
      <div className="page-search p-4 color-search-bg container">
        <ExhibitSearch onSearch={handleSearch} />
      </div>

      <div className="page-list mb-4">
        <div className="container">
          <div className="row g-3">
            {exhibit.map((exhibit, index) => (
              <ExhibitCard exhibit={exhibit} key={index} column={3} />
            ))}
          </div>
        </div>
      </div>
      <Pagi current={page + 1} totalPages={totalPages} pagi={pagi} />
    </>
  );
}
