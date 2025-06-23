import React, { useContext, useEffect, useState } from "react";

import "./homepage.scss";
import Carousel from "../../components/carousel/Carousel";

import { NavLink } from "react-router-dom";
import { getAllAuthors } from "../../api/AuthorAPI";
import { getAllNews } from "../../api/NewsAPI";
import ImgDefault from "../../assets/images/Slide2.jpg";

import { Loader } from "../../components/Loader/Loader";
import { LoaderText } from "../../components/Loader/LoaderText";
import { formatDate } from "../../utils/formatDate";
import { LoginContext } from "../../context/LoginContext";
import { getAllWorks } from "../../api/WorkAPI";
import { getAllStories } from "../../api/StoryAPI";
import { getAllExhibits } from "../../api/ExhibitAPI";

export default function HomePage() {
  const [authors, setAuthors] = useState([]);
  const [loadingAuthor, setLoadingAuthor] = useState(false);

  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);

  const [works, setWorks] = useState([]);
  const [loadingWork, setLoadingWork] = useState(false);

  const [exhibits, setExhibits] = useState([]);
  const [loadingExhibits, setLoadingExhibits] = useState(false);

  const [stories, setStories] = useState([]);
  const [loadingStories, setLoadingStories] = useState(false);

  useEffect(() => {
    fetchAuthors();
    fetchNews();
    fetchWorks();
    fetchStories();
    fetchExhibits();
  }, []);

  const fetchAuthors = async () => {
    setLoadingAuthor(true);
    try {
      let req = {
        page: 0,
        size: 3,
        sort: "",
        searchText: "",
      };
      const data = await getAllAuthors(req);
      console.log("authors: ", data);
      if (data) {
        setAuthors(data.content);
        setLoadingAuthor(false);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tác giả:", error);
    }
  };

  const fetchNews = async () => {
    setLoadingNews(true);
    try {
      let req = {
        page: 0,
        size: 3,
        sort: "createdAt,desc",
        searchText: "",
      };
      const data = await getAllNews(req);
      console.log("news : ", data);
      setNews(data.content);

      // console.log("news : ", data.content[0].files[0]?.fileUrl);
      setLoadingNews(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu tin tức:", error);
    }
  };

  const fetchWorks = async () => {
    setLoadingWork(true);
    try {
      const data = await getAllWorks({
        page: 0,
        size: 3,
        sort: "name,asc",
        searchText: "",
      });
      console.log("works : ", data);
      setWorks(data.content);
      setLoadingWork(false);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  const fetchStories = async () => {
    setLoadingStories(true);
    try {
      const data = await getAllStories({
        page: 0,
        size: 3,
        sort: "name,asc",
        searchText: "",
      });
      console.log("stories: ", data);
      setStories(data.content);
      setLoadingStories(false);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  const fetchExhibits = async () => {
    setLoadingExhibits(true);
    try {
      const data = await getAllExhibits({
        page: 0,
        size: 3,
        sort: "name,asc",
        searchText: "",
        type: "",
      });

      setExhibits(data.content);
      setLoadingExhibits(false);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  const list = [1, 2, 3];

  return (
    <>
      <div className="color-primary-bg ">
        <Carousel />
        <div className="container">
          <div className="section-info pt-3  ">
            <div className="box-c">
              <div className="info-header custom-underline font-s-30 font-w-700">
                THAM QUAN
              </div>
            </div>

            <div className="section-body wrap-container ">
              <div className="row  text-center">
                <div className="col-12">
                  <h4 className="color-yellow-text">
                    Chào mừng quý vị đã đến với Bảo tàng Văn học Việt Nam!
                  </h4>

                  <p>
                    Bảo tàng Văn học Việt Nam được thành lập ngày 8 tháng 11 năm
                    2011 theo Quyết định số 1987/QĐ-TTg của Thủ tướng Chính phủ.
                    Trải qua quá trình sưu tầm và trưng bày đến ngày 26 tháng 6
                    năm 2015, Bảo tàng Văn học Việt Nam chính thức mở cửa đón
                    khách tham quan. Bảo tàng được xây dựng tại địa chỉ 275 Âu
                    Cơ, phường Quảng An, quận Tây Hồ, TP Hà Nội. Cách trung tâm
                    Hà Nội 6,2 km về phía Bắc. Mảnh đất này vào những năm 60-70
                    của thế kỷ trước là Trường Viết văn Quảng Bá của Hội Nhà văn
                    Việt Nam . Nơi đây đã lưu lại nhiều kỉ niệm của các nhà văn,
                    nhà thơ nổi tiếng.
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="info-box">
                    <div className="info-icon mb-3">
                      <i className="fa-solid fa-clock color-red-text mb-2"></i>
                      <div className="font-s-24 color-red-text font-w-600 mb-2">
                        Thời gian mở cửa
                      </div>
                      <div>Sáng: Từ 8h00 đến 12h00</div>
                      <div>Chiều: Từ 13h30 đến 17h</div>
                      <div>Từ Thứ 2 đến Chủ nhật.</div>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="info-box">
                    <div className="info-icon mb-3">
                      <i className="fa-solid fa-ticket color-red-text mb-2"></i>
                      <div className="font-s-24 color-red-text font-w-600 mb-2">
                        Vé vào cổng
                      </div>
                      <div>Học sinh/sinh viên : 15.000 VNĐ/vé </div>
                      <div>Người lớn : 20.000 VNĐ/vé</div>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="info-box text-center">
                    <div className="info-icon mb-3">
                      <i className="fa-solid fa-location-dot color-red-text mb-2"></i>
                      <div className="font-s-24 color-red-text font-w-600 mb-2 ">
                        Địa chỉ
                      </div>
                      <div>275 Âu Cơ, phường Quảng An,</div>
                      <div>quận Tây Hồ, TP Hà Nội</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="section-news pt-4">
            <div className="box-c">
              <NavLink
                to="/news"
                className="custom-underline font-s-30 font-w-700"
              >
                TIN TỨC - SỰ KIỆN
              </NavLink>
            </div>

            <div className="section-body  wrap-container">
              <div className="row ">
                <div className="col-6">
                  <div className="box-left">
                    {loadingNews === false && news.length > 0 ? (
                      <>
                        <div className="box-image-lg">
                          <NavLink
                            to={`/news/${news[0]?.id}`}
                            key={news[0]?.id}
                          >
                            <img
                              src={news[0]?.files[0]?.fileUrl ?? ImgDefault}
                              alt="Tin tuc"
                            />
                          </NavLink>
                        </div>
                        <div className="box-body">
                          <div className="box-time">
                            {formatDate(news[0]?.createdAt)}
                          </div>
                          <NavLink
                            to={`/news/${news[0]?.id}`}
                            key={news[0]?.id}
                          >
                            <div className="box-title color-dark-text font-w-600  py-2 multiline-truncate">
                              {news[0]?.name}
                            </div>
                          </NavLink>

                          <div className="box-desc multiline-truncate">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: news[0]?.content,
                              }}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="box-image">
                          <Loader />
                        </div>
                        <div className="box-body">
                          <LoaderText />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="col-6">
                  <div className="box-right">
                    {loadingNews === false && news.length > 0 ? (
                      news.map((item) => (
                        <div className="box-item">
                          <NavLink
                            to={`/news/${item.id}`}
                            className="color-dark-text  single-truncate"
                            key={item.id}
                          >
                            {item?.name}
                          </NavLink>
                        </div>
                      ))
                    ) : (
                      <LoaderText />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-group">
            <div className="row">
              {/* TÁC GIẢ */}
              <div className="col-4">
                <div className="section-child">
                  <div className="box-c">
                    <NavLink
                      to="/authors"
                      className="custom-underline font-s-30 font-w-700"
                    >
                      TÁC GIẢ
                    </NavLink>
                  </div>

                  <div className="section-body wrap-container">
                    <div className="box-left">
                      {loadingAuthor === false && authors ? (
                        <>
                          <div className="box-image-sm mb-4">
                            <NavLink
                              to={`/authors/${authors[0]?.id}`}
                              key={authors[0]?.id}
                            >
                              <img
                                src={
                                  authors[0]?.files[0]?.fileUrl ?? ImgDefault
                                }
                                alt="Tin tuc"
                              />
                            </NavLink>
                          </div>
                          <div className="box-body">
                            <NavLink
                              to={`/authors/${authors[0]?.id}`}
                              key={authors[0]?.id}
                            >
                              <div className="box-title color-dark-text font-w-600 font-s-20 text-center py-2 multiline-truncate mb-3 ">
                                {authors[0]?.name}
                              </div>
                            </NavLink>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="box-image">
                            <Loader />
                          </div>
                          <div className="box-body">
                            <LoaderText />
                          </div>
                        </>
                      )}
                    </div>

                    <hr className="border-2 my-4" />
                    <div className="box-right">
                      {loadingAuthor === false && authors ? (
                        authors.map((item) => (
                          <div className="box-item" key={item.id}>
                            <div className="row">
                              <div className="col-3">
                                <div className="box-image-xs">
                                  <NavLink
                                    to={`/authors/${authors[0]?.id}`}
                                    key={authors[0]?.id}
                                  >
                                    <img
                                      src={
                                        authors[0]?.files[0]?.fileUrl ??
                                        ImgDefault
                                      }
                                      alt="Tac gia"
                                    />
                                  </NavLink>
                                </div>
                              </div>

                              <div className="col-9">
                                <NavLink
                                  to={`/authors/${item.id}`}
                                  className="color-dark-text   multiline-truncate"
                                  key={item.id}
                                >
                                  {item?.name}
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <LoaderText />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* TAC PHAM */}
              <div className="col-4">
                <div className="section-child">
                  <div className="box-c">
                    <NavLink
                      to="/works"
                      className="custom-underline font-s-30 font-w-700"
                    >
                      TÁC PHẨM
                    </NavLink>
                  </div>

                  <div className="section-body wrap-container">
                    <div className="box-left">
                      {loadingWork === false && works ? (
                        <>
                          <div className="box-image-sm mb-4">
                            <NavLink
                              to={`/works/${works[0]?.id}`}
                              key={works[0]?.id}
                            >
                              <img
                                src={works[0]?.files[0]?.fileUrl ?? ImgDefault}
                                alt="Tin tuc"
                              />
                            </NavLink>
                          </div>
                          <div className="box-body">
                            <NavLink
                              to={`/works/${works[0]?.id}`}
                              key={works[0]?.id}
                            >
                              <div className="box-title color-dark-text font-w-600 font-s-20 text-center py-2 multiline-truncate mb-3 ">
                                {works[0]?.name}
                              </div>
                            </NavLink>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="box-image">
                            <Loader />
                          </div>
                          <div className="box-body">
                            <LoaderText />
                          </div>
                        </>
                      )}
                    </div>

                    <hr className="border-2 my-4" />
                    <div className="box-right">
                      {loadingWork === false && works ? (
                        works.map((item) => (
                          <div className="box-item" key={item.id}>
                            <div className="row">
                              <div className="col-3">
                                <div className="box-image-xs">
                                  <div className="box-image-xs">
                                    <NavLink
                                      to={`/works/${works[0]?.id}`}
                                      key={works[0]?.id}
                                    >
                                      <img
                                        src={
                                          works[0]?.files[0]?.fileUrl ??
                                          ImgDefault
                                        }
                                        alt="Tac pham"
                                      />
                                    </NavLink>
                                  </div>
                                </div>
                              </div>

                              <div className="col-9">
                                <NavLink
                                  to={`/works/${item.id}`}
                                  className="color-dark-text   multiline-truncate"
                                  key={item.id}
                                >
                                  {item?.name}
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <LoaderText />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Cau chuyen */}
              <div className="col-4">
                <div className="section-child">
                  <div className="box-c">
                    <NavLink
                      to="/stories"
                      className="custom-underline font-s-30 font-w-700"
                    >
                      CÂU CHUYỆN
                    </NavLink>
                  </div>

                  <div className="section-body wrap-container">
                    <div className="box-left">
                      {loadingStories === false && stories ? (
                        <>
                          <div className="box-image-sm mb-4">
                            <NavLink
                              to={`/stories/${stories[0]?.id}`}
                              key={stories[0]?.id}
                            >
                              <img
                                src={
                                  stories[0]?.files[0]?.fileUrl ?? ImgDefault
                                }
                                alt="Cau chuyen"
                              />
                            </NavLink>
                          </div>
                          <div className="box-body">
                            <NavLink
                              to={`/stories/${stories[0]?.id}`}
                              key={stories[0]?.id}
                            >
                              <div className="box-title color-dark-text font-w-600 font-s-20 text-center py-2 multiline-truncate mb-3 ">
                                {stories[0]?.name}
                              </div>
                            </NavLink>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="box-image">
                            <Loader />
                          </div>
                          <div className="box-body">
                            <LoaderText />
                          </div>
                        </>
                      )}
                    </div>

                    <hr className="border-2 my-4" />
                    <div className="box-right">
                      {loadingStories === false && stories ? (
                        stories.map((item) => (
                          <div className="box-item" key={item.id}>
                            <div className="row">
                              <div className="col-3">
                                <div className="box-image-xs">
                                  <div className="box-image-xs">
                                    <NavLink
                                      to={`/stories/${stories[0]?.id}`}
                                      key={stories[0]?.id}
                                    >
                                      <img
                                        src={
                                          stories[0]?.files[0]?.fileUrl ??
                                          ImgDefault
                                        }
                                        alt="Cau chuyen"
                                      />
                                    </NavLink>
                                  </div>
                                </div>
                              </div>

                              <div className="col-9">
                                <NavLink
                                  to={`/stories/${item.id}`}
                                  className="color-dark-text   multiline-truncate"
                                  key={item.id}
                                >
                                  {item?.name}
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <LoaderText />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-exhibit">
            <div className="box-c">
              <NavLink to="#" className="custom-underline font-s-30 font-w-700">
                TRƯNG BÀY
              </NavLink>
            </div>

            <div className="section-body wrap-container">
              <div className="row">
                {loadingExhibits === false && exhibits ? (
                  <>
                    <div className="col-3">
                      <div className="box-image-sm">
                        <NavLink
                          to={`/exhibits/${exhibits[0]?.id}`}
                          key={exhibits[0]?.id}
                        >
                          <img
                            src={exhibits[0]?.files[0]?.fileUrl ?? ImgDefault}
                            alt="Trung bay"
                          />
                        </NavLink>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="box-image">
                      <Loader />
                    </div>
                    <div className="box-body">
                      <LoaderText />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
