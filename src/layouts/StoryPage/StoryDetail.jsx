import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAllStories, getStoryById } from "../../api/StoryAPI";
import { LoaderText } from "../../components/Loader/LoaderText";
import { getAuthorById } from "../../api/AuthorAPI";

export default function StoryDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const [author, setAuthor] = useState(null);
  const [story, setStory] = useState(null);
  const [stories, setStories] = useState([]);

  // Hàm để gọi API lấy thông tin tác giả
  const fetchStoryById = async (storyId) => {
    try {
      const res = await getStoryById(storyId);

      setStory(res);
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
        searchText: "",
      });

      setStories(data.content);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // Gọi API khi component load
  useEffect(() => {
    if (id) {
      fetchStoryById(id);
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
    if (story) fetchAuthorById(story?.authorId);
  });

  return (
    <>
      <div className="story-detail container">
        <div className="row">
          <div className="col-8">
            <h3 className="story-title  font-w-600 pb-4 ">{story?.name}</h3>

            {story?.authorId && (
              <h6>
                Tác giả:{" "}
                <NavLink
                  to={`/authors/${story?.authorId}`}
                  className="story-author font-w-400 pb-4 mb-4 color-dark-text  "
                >
                  {author?.name}
                </NavLink>
              </h6>
            )}

            <div
              className="story-content pt-4"
              dangerouslySetInnerHTML={{ __html: story?.content || "" }}
            ></div>
          </div>

          <div className="col-4">
            <div className="box-right p-3">
              <h5 className="story-title  font-w-500 mb-4 pt-3">
                Câu chuyện tiêu biểu
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
          </div>
        </div>
      </div>
    </>
  );
}
