import React from "react";
import "./storycard.scss";
import { NavLink } from "react-router-dom";
import defaultImage from "../../assets/images/Slide2.jpg";

export default function StoryCard(props) {
  return (
    <div className="col-4 p-4" key={props.story.id}>
      <div className="card p-3 ">
        <NavLink
          to={`/story/${props.story.id}`}
          className="color-dark-text font-w-700"
        >
          <div className="image-container">
            <img
              src={props.story?.listImages?.[0]?.url ?? defaultImage}
              className="card-img-top"
              alt="..."
            />
          </div>
        </NavLink>
        <div className="card-body">
          <h5 className="card-title font-w-900 ">
            <NavLink
              to={`/story/${props.story.id}`}
              className="color-dark-text font-w-700  multiline-truncate"
            >
              {props.story.title}
            </NavLink>
          </h5>
          {/* <p className="card-text multiline-truncate">
            {props.story.description}
          </p> */}
        </div>
      </div>
    </div>
  );
}
