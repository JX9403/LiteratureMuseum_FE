import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStoryById } from "../../api/StoryAPI";

export default function StoryDetail() {
  const { id } = useParams(); // Lấy ID từ URL

  const [story, setStory] = useState(null);

  // Hàm để gọi API lấy thông tin tác giả
  const fetchStory = async (storyId) => {
    try {
      const res = await getStoryById(storyId);

      setStory(res);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu tác giả:", err);
    }
  };

  // Gọi API khi component load
  useEffect(() => {
    if (id) {
      fetchStory(id);
    }
  }, [id]);

  return (
    <>
      <div className="story-detail container">
        <div className="row">
          <div className="col-9">
            <h2 className="story-title color-red-text font-w-900">
              {story?.title}
            </h2>

            <div
              className="story-content"
              dangerouslySetInnerHTML={{ __html: story?.content || "" }}
            ></div>
          </div>

          <div className="col-3">
            <div className="story-sidebar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
