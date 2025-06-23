import React, { useEffect, useState } from "react";
import NewsSearch from "../Admin/NewsManagement/NewsSearch";

import { useNavigate } from "react-router-dom";
import { getAllNews } from "../../api/NewsAPI";
import NewsCard from "../../components/NewsCard/NewsCard";
import { Pagi } from "../../components/Pagi/Pagi";

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchNews();
  }, [page, searchText, sort]);

  const fetchNews = async () => {
    try {
      const data = await getAllNews({
        page: page,
        size: 10,
        sort: sort || "createdAt,desc",
        searchText: searchText || "",
      });

      setNews(data.content);
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
        <NewsSearch onSearch={handleSearch} />
      </div>

      <div className="page-list mb-4">
        <div className="container">
          <div className="row g-3">
            {news.map((news, index) => (
              <NewsCard news={news} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Pagi current={page + 1} totalPages={totalPages} pagi={pagi} />
    </>
  );
}
