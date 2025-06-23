import React from "react";
import { NavLink } from "react-router-dom";
import defaultImage from "../../assets/images/Slide2.jpg";

export default function AuthorCard(props) {
  return (
    <div className={`col-${props.column}`} key={props.author.id}>
      <div className="box-card">
        <NavLink
          to={`/authors/${props.author.id}`}
          className="color-dark-text font-w-500"
        >
          <div className="image-container">
            <img
              src={props.author?.files?.[0]?.fileUrl ?? defaultImage}
              className="card-img-top"
              alt="..."
            />
          </div>
        </NavLink>
        <div className="box-body">
          <div className="font-w-500 ">
            <NavLink
              to={`/authors/${props.author.id}`}
              className="color-dark-text font-w-700"
            >
              {props.author.type === "POET" ? "Nhà thơ" : "Nhà văn"}{" "}
              {props.author.name}
            </NavLink>
          </div>
          <p className="card-text multiline-truncate">{props.author.career}</p>
        </div>
      </div>
    </div>
  );
}
