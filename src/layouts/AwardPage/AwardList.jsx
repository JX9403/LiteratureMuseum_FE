import React, { useEffect, useState } from "react";
import AwardSearch from "../Admin/AwardManagement/AwardSearch";

import { useNavigate } from "react-router-dom";
import { getAllAwards } from "../../api/AwardAPI";

import { Pagi } from "../../components/Pagi/Pagi";
import AwardCard from "../../components/AwardCard/AuthorCard";

export default function AwardList() {
  const [award, setAward] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchAward();
  }, [page, searchText, sort]);

  const fetchAward = async () => {
    try {
      const data = await getAllAwards({
        page: page,
        size: 10,
        sort: sort || "name,asc",
        searchText: searchText || "",
      });

      setAward(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  const handleSearch = (searchText, sort) => {
    console.log("from table: ", { searchText, sort });
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
        <AwardSearch onSearch={handleSearch} />
      </div>

      <div className="page-list mb-4">
        <div className="container">
          <div className="row ">
            {award.map((award, index) => (
              <AwardCard award={award} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Pagi current={page + 1} totalPages={totalPages} pagi={pagi} />
    </>
  );
}
