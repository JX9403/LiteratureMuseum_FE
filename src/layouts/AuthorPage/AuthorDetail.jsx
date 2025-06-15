import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAllAuthors, getAuthorById } from "../../api/AuthorAPI";
import { LoaderText } from "../../components/Loader/LoaderText";
import { formatDate } from "../../utils/formatDate";

export default function AuthorDetail() {
  const { id } = useParams(); // Lấy ID từ URL

  const [author, setAuthor] = useState(null);
  const [listAuthor, setListAuthor] = useState([]);

  // Hàm để gọi API lấy thông tin tác giả
  const fetchAuthorById = async (authorId) => {
    try {
      const res = await getAuthorById(authorId);

      setAuthor(res);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  const fetchAuthor = async () => {
    try {
      const data = await getAllAuthors({
        page: 0,
        size: 5,
        sort: "name,desc",
        searchText: "",
      });

      setListAuthor(data.content);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  useEffect(() => {
    fetchAuthor();
  }, []);

  // Gọi API khi component load
  useEffect(() => {
    if (id) {
      fetchAuthorById(id);
    }
  }, [id]);

  return (
    <>
      <div className="author-detail container">
        <div className="row">
          <div className="col-8">
            <h3 className="author-title  font-w-600 pb-4 mb-4">
              {author?.name}
            </h3>

            <div
              className="author-content pt-4"
              dangerouslySetInnerHTML={{ __html: author?.content || "" }}
            ></div>
          </div>

          <div className="col-4">
            <div className="box-right p-3">
              <h5 className="author-title  font-w-500 mb-4 pt-3">
                Bài viết mới nhất
              </h5>
              <hr />
              {listAuthor.length > 0 ? (
                listAuthor.map((item) => (
                  <div className="box-item ">
                    <NavLink
                      to={`/author/${item.id}`}
                      className="color-dark-text  multiline-truncate"
                      key={item.id}
                    >
                      {item?.name}
                    </NavLink>
                    <div className="box-time">
                      {formatDate(item?.createdAt)}
                    </div>
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
