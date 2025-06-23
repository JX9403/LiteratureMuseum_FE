import React, { useEffect, useState } from "react";
import WorkSearch from "../Admin/WorkManagement/WorkSearch";

import { useNavigate } from "react-router-dom";
import { getAllWorks } from "../../api/WorkAPI";
import WorkCard from "../../components/WorkCard/WorkCard";
import { Pagi } from "../../components/Pagi/Pagi";

export default function WorkList() {
  const [work, setWork] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");
  const [authorId, setAuthorId] = useState(0);

  useEffect(() => {
    fetchWork();
  }, [page, searchText, sort, authorId]);

  const fetchWork = async () => {
    try {
      const data = await getAllWorks({
        page: page,
        size: 10,
        sort: sort || "name,asc",
        searchText: searchText || "",
        authorId: authorId,
      });

      setWork(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  const handleSearch = (searchText, sort, authorId) => {
    console.log("from table: ", { searchText, sort, authorId });
    setPage(0);
    setSearchText(searchText);
    setSort(sort);
    setAuthorId(authorId);
  };

  const pagi = (current) => {
    setPage(current);
  };
  return (
    <>
      <div className="page-search p-4 color-search-bg container">
        <WorkSearch onSearch={handleSearch} />
      </div>

      <div className="page-list mb-4">
        <div className="container">
          <div className="row g-3">
            {work.map((work, index) => (
              <WorkCard work={work} key={index} column={4} />
            ))}
          </div>
        </div>
      </div>
      <Pagi current={page + 1} totalPages={totalPages} pagi={pagi} />
    </>
  );
}
