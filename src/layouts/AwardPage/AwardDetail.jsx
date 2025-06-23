import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAllAwards, getAwardById } from "../../api/AwardAPI";
import { LoaderText } from "../../components/Loader/LoaderText";
import { formatDate } from "../../utils/formatDate";
import { getAllAuthorByAward } from "../../api/AuthorAPI";
import AuthorCard from "../../components/AuthorCard/AuthorCard";
import { Pagi } from "../../components/Pagi/Pagi";

export default function AwardDetail() {
  const { id } = useParams(); // Lấy ID từ URL

  const [award, setAward] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");
  const [listAwards, setListAwards] = useState([]);

  useEffect(() => {
    fetchListAwards();
  }, []);

  const fetchListAwards = async () => {
    try {
      const data = await getAllAwards({
        page: 0,
        size: 5,
        sort: "name,asc",
        searchText: "",
      });

      setListAwards(data.content);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  const fetchAwardById = async (awardId) => {
    try {
      const res = await getAwardById(awardId);

      setAward(res);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  const fetchAuthors = async () => {
    try {
      const data = await getAllAuthorByAward({
        page: 0,
        size: 10,
        sort: "name,asc",
        awardId: id || 0,
      });

      setAuthors(data.content);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, [page, searchText, sort, id]);

  // Gọi API khi component load
  useEffect(() => {
    if (id) {
      fetchAwardById(id);
    }
  }, [id]);

  const pagi = (current) => {
    setPage(current);
  };

  return (
    <>
      <div className="award-detail container">
        <div className="row">
          <div className="col-8">
            <h3 className="award-title  font-w-600 pb-4 mb-4">{award?.name}</h3>

            <div className="award-content pt-4">
              <div className="page-list mb-4">
                <div className="container">
                  <div className="row ">
                    {authors.map((author, index) => (
                      <AuthorCard author={author} key={index} column={4} />
                    ))}
                  </div>
                </div>
              </div>
              <Pagi current={page + 1} totalPages={totalPages} pagi={pagi} />
            </div>
          </div>

          <div className="col-4">
            <div className="box-right p-3">
              <h5 className="award-title  font-w-500 mb-4 pt-3">
                Các giải thưởng khác
              </h5>
              <hr />
              {listAwards.length > 0 ? (
                listAwards.map((item) => (
                  <div className="box-item ">
                    <NavLink
                      to={`/awards/${item.id}`}
                      className="color-dark-text  multiline-truncate"
                      key={item.id}
                    >
                      {item?.name}
                    </NavLink>
                  </div>
                ))
              ) : (
                <LoaderText />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
