import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAllWorks, getWorkById } from "../../api/WorkAPI";
import { LoaderText } from "../../components/Loader/LoaderText";
import { getAuthorById } from "../../api/AuthorAPI";

export default function WorkDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const [author, setAuthor] = useState(null);
  const [work, setWork] = useState(null);
  const [works, setWorks] = useState([]);

  // Hàm để gọi API lấy thông tin tác giả
  const fetchWorkById = async (workId) => {
    try {
      const res = await getWorkById(workId);

      setWork(res);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  const fetchWorks = async () => {
    try {
      const data = await getAllWorks({
        page: 0,
        size: 3,
        sort: "name,asc",
        searchText: "",
      });

      setWorks(data.content);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  // Gọi API khi component load
  useEffect(() => {
    if (id) {
      fetchWorkById(id);
    }
  }, [id]);
  // Hàm để gọi API lấy thông tin tác giả
  const fetchAuthorById = async (authorId) => {
    try {
      const res = await getAuthorById(authorId);

      setAuthor(res);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };
  // Gọi API khi component load
  useEffect(() => {
    if (work) fetchAuthorById(work?.authorId);
  });

  return (
    <>
      <div className="work-detail container">
        <div className="row">
          <div className="col-8">
            <h3 className="work-title  font-w-600 pb-4 ">{work?.name}</h3>

            {work?.authorId && (
              <h6>
                Tác giả:{" "}
                <NavLink
                  to={`/authors/${work?.authorId}`}
                  className="work-author font-w-400 pb-4 mb-4 color-dark-text  "
                >
                  {author?.name}
                </NavLink>
              </h6>
            )}

            <div
              className="work-content pt-4"
              dangerouslySetInnerHTML={{ __html: work?.content || "" }}
            ></div>
          </div>

          <div className="col-4">
            <div className="box-right p-3">
              <h5 className="work-title  font-w-500 mb-4 pt-3">
                Tác phẩm tiêu biểu
              </h5>
              <hr />
              {works.length > 0 ? (
                works.map((item) => (
                  <div className="box-item ">
                    <NavLink
                      to={`/works/${item.id}`}
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
