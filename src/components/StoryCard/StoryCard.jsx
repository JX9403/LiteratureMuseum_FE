import React from "react";
import { formatDate } from "../../utils/formatDate";
import { NavLink } from "react-router-dom";
import defaultImage from "../../assets/images/Slide2.jpg";

export default function StoryCard(props) {
  return (
    <div className="col-3" key={props.story.id}>
      <div className="box-card">
        <NavLink
          to={`/stories/${props.story.id}`}
          className="color-dark-text font-w-500"
        >
          <div className="image-container">
            <img
              src={props.story?.files?.[0]?.fileUrl ?? defaultImage}
              className="card-img-top"
              alt="..."
            />
          </div>
        </NavLink>
        <div className="box-body">
          <div className="font-w-500 ">
            <NavLink
              to={`/stories/${props.story.id}`}
              className="color-dark-text font-w-500  multiline-truncate"
            >
              {props.story.name}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
