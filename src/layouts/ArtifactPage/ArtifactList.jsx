import React, { useEffect, useState } from "react";
import ArtifactSearch from "../Admin/ArtifactManagement/ArtifactSearch";

import { useNavigate } from "react-router-dom";
import { getAllArtifacts } from "../../api/ArtifactAPI";
import ArtifactCard from "../../components/ArtifactCard/ArtifactCard";
import { Pagi } from "../../components/Pagi/Pagi";

export default function ArtifactList() {
  const [artifact, setArtifact] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetchArtifact();
  }, [page, searchText, sort, type]);

  const fetchArtifact = async () => {
    try {
      const data = await getAllArtifacts({
        page: page,
        size: 10,
        sort: sort || "name,asc",
        searchText: searchText || "",
        type: type || "",
      });

      setArtifact(data.content);
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
        <ArtifactSearch onSearch={handleSearch} />
      </div>

      <div className="page-list mb-4">
        <div className="container">
          <div className="row g-3">
            {artifact.map((artifact, index) => (
              <ArtifactCard artifact={artifact} key={index} column={3} />
            ))}
          </div>
        </div>
      </div>
      <Pagi current={page + 1} totalPages={totalPages} pagi={pagi} />
    </>
  );
}
