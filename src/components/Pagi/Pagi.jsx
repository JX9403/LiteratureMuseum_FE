import React from "react";
import "./pagi.scss";

export const Pagi = (props) => {
  const { current, totalPages, pagi } = props;

  // Mảng lưu các trang cần hiển thị
  const listPages = [];

  // Xử lý trường hợp trang hiện tại là 1
  if (current === 1) {
    listPages.push(current);
    if (totalPages > current) listPages.push(current + 1);
    if (totalPages > current + 1) listPages.push(current + 2);
  }
  // Xử lý trường hợp trang hiện tại lớn hơn 1
  else if (current > 1) {
    if (current > 2) listPages.push(current - 2); // Trang cách 2 trang
    if (current > 1) listPages.push(current - 1); // Trang ngay trước đó
    listPages.push(current); // Trang hiện tại
    if (totalPages >= current + 1) listPages.push(current + 1); // Trang sau đó
    if (totalPages >= current + 2) listPages.push(current + 2); // Trang tiếp theo sau đó
  }

  // Đảm bảo rằng listPages không vượt quá totalPages
  const finalPages = listPages.filter((page) => page <= totalPages);

  return (
    <div className="pagination d-flex justify-content-center">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item" onClick={() => pagi(1)}>
            <button className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {finalPages.map((page) => (
            <li
              className={"page-item " + (current === page ? "active" : "")}
              key={page}
              onClick={() => pagi(page)}
            >
              <button className="page-link">{page}</button>
            </li>
          ))}
          <li className="page-item" onClick={() => pagi(totalPages)}>
            <button className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
