import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Pagi } from "../../components/Pagi/Pagi";
import { Story } from "../../model/StoryModel";
import { getAllStory } from "../../api/StoryAPI";
import StoryCard from "../../components/StoryCard/StoryCard";
import StorySearch from "../Admin/StoryManagement/StorySearch";

export default function StoryList() {
  const [story, setStory] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams, setSearchParams] = useState({
    searchText: "",
    searchField: "title",
    sortOption: "asc",
    startDate: "",
    endDate: "",
  });
  const pageSize = 10;

  const navigate = useNavigate();

  useEffect(() => {
    fetchStory();
  }, [currentPage, searchParams]);

  const fetchStory = async () => {
    try {
      const data = await getAllStory(
        currentPage,
        pageSize,
        searchParams.searchText,
        searchParams.searchField, // thêm searchField ở đây
        searchParams.sortOption,
        searchParams.startDate,
        searchParams.endDate
      );
      console.log("Get all story: ", data);
      setStory(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bài báo:", error);
    }
  };

  const handleSearch = (
    searchText,
    searchField,
    sortOption,
    startDate,
    endDate
  ) => {
    setCurrentPage(0); // reset về trang đầu
    setSearchParams({
      searchText,
      searchField,
      sortOption,
      startDate,
      endDate,
    });
  };

  const pagi = (current) => {
    setCurrentPage(current);
  };
  return (
    <>
      <div className="page-search p-4 color-search-bg container">
        <StorySearch onSearch={handleSearch} />
      </div>

      <div className="page-list">
        <div className="container">
          <h3 className="row color-red-text font-w-900">Danh sách bài báo</h3>
          <div className="row">
            {story.map((story, index) => (
              <StoryCard story={story} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Pagi current={currentPage + 1} totalPages={totalPages} pagi={pagi} />
    </>
  );
}
