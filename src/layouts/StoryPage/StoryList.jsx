import React, { useEffect, useState } from "react";
import StorySearch from "../Admin/StoryManagement/StorySearch";

import { useNavigate } from "react-router-dom";
import { getAllStories } from "../../api/StoryAPI";
import StoryCard from "../../components/StoryCard/StoryCard";
import { Pagi } from "../../components/Pagi/Pagi";

export default function StoryList() {
  const [story, setStory] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");
  const [authorId, setAuthorId] = useState(0);

  useEffect(() => {
    fetchStory();
  }, [page, searchText, sort, authorId]);

  const fetchStory = async () => {
    try {
      const data = await getAllStories({
        page: page,
        size: 10,
        sort: sort || "name,asc",
        searchText: searchText || "",
        authorId: authorId,
      });

      setStory(data.content);
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
        <StorySearch onSearch={handleSearch} />
      </div>

      <div className="page-list mb-4">
        <div className="container">
          <div className="row g-3">
            {story.map((story, index) => (
              <StoryCard story={story} key={index} column={4} />
            ))}
          </div>
        </div>
      </div>
      <Pagi current={page + 1} totalPages={totalPages} pagi={pagi} />
    </>
  );
}
