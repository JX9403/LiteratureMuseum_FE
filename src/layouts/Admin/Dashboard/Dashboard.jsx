import React, { useEffect, useState } from "react";
import {
  fetchDashboardCounts,
  fetchDashboardHighlights,
} from "../../../api/DashboardAPI";

export default function Dashboard() {
  const [counts, setCounts] = useState(null);
  const [highlights, setHighlights] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [countData, highlightData] = await Promise.all([
          fetchDashboardCounts(),
          fetchDashboardHighlights(),
        ]);
        setCounts(countData);
        setHighlights(highlightData);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu dashboard:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard container mt-4">
      <div className="manage-header mb-4">
        <h3 className="font-w-900 color-red-text">TỔNG QUAN</h3>
        <hr />
      </div>

      {!counts ? (
        <p>Đang tải số liệu...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
          {Object.entries(counts).map(([key, value]) => (
            <div className="col" key={key}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title text-uppercase">{key}</h5>
                  <p className="card-text display-6">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="manage-header mt-5 mb-3">
        <h4 className="font-w-900 color-red-text">THỐNG KÊ NỔI BẬT</h4>
        <hr />
      </div>
      {!highlights ? (
        <p>Đang tải thống kê nổi bật...</p>
      ) : (
        <>
          {/* 3 phần nhiều view nhất, cùng hàng */}
          <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
            <div className="col">
              <div className="border rounded p-3 h-100 bg-light">
                <h6 className="font-w-900 color-red-text text-uppercase mb-3">
                  Blog nhiều view nhất:
                </h6>
                <p className="mb-1 fw-semibold">{highlights.topBlog?.name}</p>
                <p className="text-muted small">
                  {highlights.topBlog?.view} lượt xem
                </p>
              </div>
            </div>

            <div className="col">
              <div className="border rounded p-3 h-100 bg-light">
                <h6 className="font-w-900 color-red-text text-uppercase mb-3">
                  Tin tức nhiều view nhất:
                </h6>
                <p className="mb-1 fw-semibold">{highlights.topNews?.name}</p>
                <p className="text-muted small">
                  {highlights.topNews?.view} lượt xem
                </p>
              </div>
            </div>

            <div className="col">
              <div className="border rounded p-3 h-100 bg-light">
                <h6 className="font-w-900 color-red-text text-uppercase mb-3">
                  Câu chuyện nhiều view nhất:
                </h6>
                <p className="mb-1 fw-semibold">{highlights.topStory?.name}</p>
                <p className="text-muted small">
                  {highlights.topStory?.view} lượt xem
                </p>
              </div>
            </div>
          </div>

          {/* Các thống kê khác */}
          <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <div className="border rounded p-3 h-100 bg-light">
                <h6 className="font-w-900 color-red-text text-uppercase">
                  Người đăng nhiều blog nhất
                </h6>
                <p className="mb-0">User #{highlights.topBlogger}</p>
              </div>
            </div>
            <div className="col">
              <div className="border rounded p-3 h-100 bg-light">
                <h6 className="font-w-900 color-red-text text-uppercase">
                  Người bình luận nhiều nhất
                </h6>
                <p className="mb-0">User #{highlights.topCommenter}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
