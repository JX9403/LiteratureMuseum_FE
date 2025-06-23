import React from "react";
import { NavLink } from "react-router-dom";
import defaultImage from "../../assets/images/Slide2.jpg";

export default function AwardCard(props) {
  return (
    <div className="col-3 " key={props.award.id}>
      <div className="box-card">
        <NavLink
          to={`/awards/${props.award.id}`}
          className="color-dark-text font-w-500"
        ></NavLink>
        <div className="box-body">
          <div className="font-w-500 ">
            <NavLink
              to={`/awards/${props.award.id}`}
              className="color-dark-text font-w-700"
            >
              {props.award.name}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
