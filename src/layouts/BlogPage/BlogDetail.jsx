import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getAllBlogs, getBlogById } from "../../api/BlogAPI";
import { LoaderText } from "../../components/Loader/LoaderText";
import { formatDate } from "../../utils/formatDate";
import Comment from "../../components/Comment/Comment";
import { LoginContext } from "../../context/LoginContext";
import { getUserByEmail } from "../../api/UserAPI";

export default function BlogDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const { user } = useContext(LoginContext);

  const [account, setAccount] = useState(null);
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // Lấy thông tin người dùng hiện tại
  const fetchUserByEmail = async () => {
    try {
      const data = await getUserByEmail(user);
      setAccount(data);
    } catch (error) {
      console.error("Lỗi khi lấy user:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserByEmail();
    }
  }, [user]);

  // Lấy bài viết theo ID
  const fetchBlogById = async () => {
    try {
      const res = await getBlogById(id);
      setBlog(res);
    } catch (err) {
      console.error("Lỗi khi tải bài viết:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogById();
    }
  }, [id]);

  // Lấy danh sách các blog liên quan
  const fetchBlogs = async () => {
    try {
      const data = await getAllBlogs({
        page: 0,
        size: 3,
        sort: "createdAt,asc",
        authorId: id || 0,
      });

      setBlogs(data.content);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="blog-detail container">
        <div className="row">
          <div className="col-8">
            <h3 className="blog-title font-w-600 pb-4 mb-4">{blog?.name}</h3>
            <div className="box-time">{formatDate(blog?.createdAt)}</div>

            <div
              className="blog-content pt-4"
              dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
            ></div>
          </div>

          <div className="col-4">
            <div className="box-right p-3">
              <h5 className="blog-title font-w-500 mb-4 pt-3">
                Bài thảo luận mới nhất
              </h5>
              <hr />
              {blogs.length > 0 ? (
                blogs.map((item) => (
                  <div className="box-item" key={item.id}>
                    <NavLink
                      to={`/blogs/${item.id}`}
                      className="color-dark-text multiline-truncate"
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
              <hr />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Comment
              targetId={parseInt(id)}
              targetType="BLOG"
              userId={account?.id}
            />
          </div>
        </div>
      </div>
    </>
  );
}
