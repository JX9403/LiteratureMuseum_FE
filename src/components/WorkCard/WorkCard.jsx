import React from "react";
import { formatDate } from "../../utils/formatDate";
import { NavLink } from "react-router-dom";
import defaultImage from "../../assets/images/Slide2.jpg";

export default function WorkCard(props) {
  console.log("props from work card ", props);
  return (
    <div className="col-3" key={props.work.id}>
      <div className="box-card">
        <NavLink
          to={`/works/${props.work.id}`}
          className="color-dark-text font-w-500"
        >
          <div className="image-container">
            <img
              src={props.work?.files?.[0]?.fileUrl ?? defaultImage}
              className="card-img-top"
              alt="..."
            />
          </div>
        </NavLink>
        <div className="box-body">
          <div className="font-w-500 ">
            <NavLink
              to={`/works/${props.work.id}`}
              className="color-dark-text font-w-500  multiline-truncate"
            >
              {props.work.name}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
