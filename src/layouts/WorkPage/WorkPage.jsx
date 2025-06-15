import React from "react";
import slide1 from "../../assets/images/Slide1.jpg";
import { NavLink } from "react-router-dom";
import "./workpage.scss";
import { Pagi } from "../../components/Pagi/Pagi";
import WorkCard from "../../components/WorkCard/WorkCard";

export default function WorkPage() {
  const works = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const pagi = (current) => {
    // setCurrentPage(current);
  };
  return (
    <div className="page-work color-primary-bg">
      <div className="page-header">
        <div className="overlay">
          <h1 className="header-text-top color-light-text ">TÁC PHẨM</h1>
          <div className="header-text color-light-text ">
            <NavLink to="/" className="color-light-text">
              Trang chủ
            </NavLink>
            <span className="separator color-light-text"> / </span>
            <NavLink to="/works" className="color-light-text">
              Tác phẩm
            </NavLink>
          </div>
        </div>
        <div className="container-image">
          <img
            src={slide1}
            className="d-block w-100 centered-image "
            alt="..."
          />
        </div>
      </div>

      <div className="page-search"></div>
      <div className="page-list">
        <div className="container">
          <div className="row">
            {works.map((work, index) => (
              <WorkCard work={work} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Pagi current={0} totalPages={10} pagi={pagi} />
    </div>
  );
}
