import React from "react";
import "./loader.scss";
import LogoIcon from "../../assets/images/cropped-logo-.png";

export const Loader = () => {
  return (
    <div className="wrap">
      <div className="image">
        <img src={LogoIcon} alt="logo" />
      </div>
    </div>
  );
};
