import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAuthorById } from "../../api/AuthorAPI";
import { LoaderText } from "../../components/Loader/LoaderText";
import { formatDate } from "../../utils/formatDate";
import { getAllStories, getAllStoryByAuthor } from "../../api/StoryAPI";
import { getAllWorkByAuthor } from "../../api/WorkAPI";

export default function AuthorDetail() {
  const { id } = useParams(); // Lấy ID từ URL

  const [author, setAuthor] = useState(null);
  const [stories, setStories] = useState([]);
  const [works, setWorks] = useState([]);

  // Hàm để gọi API lấy thông tin tác giả
  const fetchAuthorById = async (authorId) => {
    try {
      const res = await getAuthorById(authorId);

      setAuthor(res);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  const fetchStories = async () => {
    try {
      const data = await getAllStories({
        page: 0,
        size: 3,
        sort: "name,asc",
      });

      setStories(data.content);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchWorks = async () => {
    try {
      const data = await getAllWorkByAuthor({
        page: 0,
        size: 3,
        sort: "name,asc",
        authorId: id || 0,
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
            <div className="box-right p-3 mb-3">
              <h5 className="author-title  font-w-500 mb-4 pt-3">
                Câu chuyện nhà văn
              </h5>
              <hr />

              {stories.length > 0 ? (
                stories.map((item) => (
                  <div className="box-item ">
                    <NavLink
                      to={`/stories/${item.id}`}
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
            <div className="box-right p-3 ">
              <h5 className="author-title  font-w-500 mb-4 pt-3">
                Tác phẩm văn học
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
