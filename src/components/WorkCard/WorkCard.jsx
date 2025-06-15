import React from "react";
import { formatDate } from "../../utils/formatDate";
import { NavLink } from "react-router-dom";
import defaultImage from "../../assets/images/Slide2.jpg";

export default function WorkCard(props) {
  return (
    <div className="col-3" key={props.work.id}>
      <div className="box-card">
        <NavLink
          to={`/work/${props.work.id}`}
          className="color-dark-text font-w-500"
        >
          <div className="image-container">
            <img
              src={props.work?.listImages?.[0]?.url ?? defaultImage}
              className="card-img-top"
              alt="..."
            />
          </div>
        </NavLink>
        <div className="box-body">
          <div className="font-w-500 ">
            <NavLink
              to={`/work/${props.work.id}`}
              className="color-dark-text font-w-500  multiline-truncate"
            >
              {props.work.title}
            </NavLink>
          </div>
          <div className="box-time">{formatDate(props.work.created ?? "")}</div>
          <p className="card-text multiline-truncate">
            {props.work.description}
            sádasdasddádasdasdasdasdasdasdasdasdasdasdasdasd
          </p>
        </div>
      </div>
    </div>
  );
}
