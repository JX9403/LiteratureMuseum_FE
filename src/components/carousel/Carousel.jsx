import React from "react";
import slide1 from "../../assets/images/Slide1.jpg";
import slide2 from "../../assets/images/Slide2.jpg";
import slide3 from "../../assets/images/Slide3.jpg";
import "./carousel.scss";

export default function Carousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="overlay">
            <div className="slider-text-top color-light-text">
              Chào mừng bạn đến với
            </div>
            <div className="slider-text color-light-text">
              BẢO TÀNG VĂN HỌC VIỆT NAM
            </div>
            <div className="btn btn-light rounded-pill px-3 py-2">XEM THÊM</div>
          </div>
          <div className="container-image">
            <img
              src={slide1}
              className="d-block w-100 centered-image"
              alt="Slide 1"
            />
          </div>
        </div>

        <div className="carousel-item">
          <div className="overlay">
            <div className="slider-text-top color-light-text">
              Chào mừng bạn đến với
            </div>
            <div className="slider-text color-light-text">
              BẢO TÀNG VĂN HỌC VIỆT NAM
            </div>
            <div className="btn btn-light rounded-pill px-3 py-2">XEM THÊM</div>
          </div>
          <div className="container-image">
            <img
              src={slide2}
              className="d-block w-100 centered-image"
              alt="Slide 2"
            />
          </div>
        </div>

        <div className="carousel-item">
          <div className="overlay">
            <div className="slider-text-top color-light-text">Giờ mở cửa:</div>
            <div className="slider-text color-light-text">8h - 17h</div>
            <div className="btn btn-light rounded-pill px-3 py-2">XEM THÊM</div>
          </div>
          <div className="container-image">
            <img
              src={slide3}
              className="d-block w-100 centered-image"
              alt="Slide 3"
            />
          </div>
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
