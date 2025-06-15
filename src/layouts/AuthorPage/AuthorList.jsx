import React, { useEffect, useState } from "react";
import AuthorSearch from "../Admin/AuthorManagement/AuthorSearch";

import { useNavigate } from "react-router-dom";
import { getAllAuthors } from "../../api/AuthorAPI";
import AuthorCard from "../../components/AuthorCard/AuthorCard";
import { Pagi } from "../../components/Pagi/Pagi";

export default function AuthorList() {
  const [author, setAuthor] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchAuthor();
  }, [page, searchText, sort]);

  const fetchAuthor = async () => {
    try {
      const data = await getAllAuthors({
        page: page,
        size: 10,
        sort: sort || "",
        searchText: searchText || "",
      });

      setAuthor(data.content);
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
        <AuthorSearch onSearch={handleSearch} />
      </div>

      <div className="page-list mb-4">
        <div className="container">
          <div className="row ">
            {author.map((author, index) => (
              <AuthorCard author={author} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Pagi current={page + 1} totalPages={totalPages} pagi={pagi} />
    </>
  );
}
