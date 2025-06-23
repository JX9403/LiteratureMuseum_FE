import React from "react";
import { formatDate } from "../../utils/formatDate";
import { NavLink } from "react-router-dom";
import defaultImage from "../../assets/images/Slide2.jpg";

export default function ArtifactCard(props) {
  return (
    <div className="col-3" key={props.artifact.id}>
      <div className="box-card">
        <NavLink
          to={`/artifacts/${props.artifact.id}`}
          className="color-dark-text font-w-500"
        >
          <div className="image-container">
            <img
              src={props.artifact?.files?.[0]?.fileUrl ?? defaultImage}
              className="card-img-top"
              alt="..."
            />
          </div>
        </NavLink>
        <div className="box-body">
          <div className="font-w-500 ">
            <NavLink
              to={`/artifacts/${props.artifact.id}`}
              className="color-dark-text font-w-500  multiline-truncate"
            >
              {props.artifact.name}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
