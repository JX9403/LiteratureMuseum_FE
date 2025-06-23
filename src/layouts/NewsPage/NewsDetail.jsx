import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAllNews, getNewsById } from "../../api/NewsAPI";
import { LoaderText } from "../../components/Loader/LoaderText";
import { formatDate } from "../../utils/formatDate";
import { LoginContext } from "../../context/LoginContext";
import Comment from "../../components/Comment/Comment";
import { getUserByEmail } from "../../api/UserAPI";

export default function NewsDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const { user } = useContext(LoginContext);
  const [account, setAccount] = useState(null);
  const [news, setNews] = useState(null);
  const [listNews, setListNews] = useState([]);
  // Lấy thông tin người dùng hiện tại
  const fetchUserByEmail = async () => {
    try {
      const data = await getUserByEmail(user);
      setAccount(data);
      console.log("user from news ", data);
    } catch (error) {
      console.error("Lỗi khi lấy user:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserByEmail();
    }
  }, [user]);
  // Hàm để gọi API lấy thông tin tác giả
  const fetchNewsById = async (newsId) => {
    try {
      const res = await getNewsById(newsId);

      setNews(res);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  const fetchNews = async () => {
    try {
      const data = await getAllNews({
        page: 0,
        size: 5,
        sort: "createdAt,desc",
        searchText: "",
      });

      setListNews(data.content);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Gọi API khi component load
  useEffect(() => {
    if (id) {
      fetchNewsById(id);
    }
  }, [id]);

  return (
    <>
      <div className="news-detail container">
        <div className="row">
          <div className="col-8">
            <h3 className="news-title  font-w-600 pb-4 mb-4">{news?.name}</h3>
            <div className="box-time">{formatDate(news?.createdAt)}</div>

            <div
              className="news-content pt-4"
              dangerouslySetInnerHTML={{ __html: news?.content || "" }}
            ></div>
          </div>

          <div className="col-4">
            <div className="box-right p-3">
              <h5 className="news-title  font-w-500 mb-4 pt-3">
                Bài viết mới nhất
              </h5>
              <hr />
              {listNews.length > 0 ? (
                listNews.map((item) => (
                  <div className="box-item ">
                    <NavLink
                      to={`/news/${item.id}`}
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

        <div className="row">
          <div className="col-12">
            <Comment
              targetId={parseInt(id)}
              targetType="NEWS"
              userId={account?.id}
            />
          </div>
        </div>
      </div>
    </>
  );
}
