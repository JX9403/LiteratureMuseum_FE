import React from "react";
import { NavLink } from "react-router-dom";
import defaultImage from "../../assets/images/Slide2.jpg";

export default function BlogCard(props) {
  return (
    <div className={`col-${props.column}`} key={props.blog.id}>
      <div className="box-card">
        <NavLink
          to={`/blogs/${props.blog.id}`}
          className="color-dark-text font-w-500"
        >
          <div className="image-container">
            <img
              src={props.blog?.files?.[0]?.fileUrl ?? defaultImage}
              className="card-img-top"
              alt="..."
            />
          </div>
        </NavLink>
        <div className="box-body">
          <div className="font-w-500 ">
            <NavLink
              to={`/blogs/${props.blog.id}`}
              className="color-dark-text font-w-700"
            >
              {props.blog.name}
            </NavLink>
          </div>
          <p className="card-text multiline-truncate">{props.blog.career}</p>
        </div>
      </div>
    </div>
  );
}
