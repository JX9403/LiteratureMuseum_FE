import React from "react";
import { NavLink } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import defaultImage from "../../assets/images/Slide2.jpg";

export default function NewsCard(props) {
  const news = props.news;
  return (
    <div className="col-3 mb-4" key={news.id}>
      <div className="box-card">
        <NavLink to={`/news/${news.id}`} className="color-dark-text font-w-500">
          <div className="image-container">
            <img
              src={(news.files && news.files[0]?.fileUrl) || defaultImage}
              className="card-img-top"
              alt="..."
            />
          </div>
        </NavLink>
        <div className="box-body mt-3" style={{ minHeight: "100px" }}>
          <div className="font-w-500">
            <NavLink
              to={`/news/${news.id}`}
              className="color-dark-text font-w-500 multiline-truncate"
            >
              {news.name}
            </NavLink>
          </div>
          <div className="box-time">{formatDate(news.createdAt || "")}</div>
        </div>
      </div>
    </div>
  );
}
