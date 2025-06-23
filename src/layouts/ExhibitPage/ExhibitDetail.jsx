import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { getAllExhibits, getExhibitById } from "../../api/ExhibitAPI";
import { LoaderText } from "../../components/Loader/LoaderText";

export default function ExhibitDetail() {
  const { id } = useParams(); // Lấy ID từ URL

  const [exhibit, setExhibit] = useState(null);
  const [listExhibits, setListExhibits] = useState([]);

  // Hàm để gọi API lấy thông tin tác giả
  const fetchExhibitById = async (exhibitId) => {
    try {
      const res = await getExhibitById(exhibitId);

      setExhibit(res);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  useEffect(() => {
    fetchExhibit();
  }, [id]);

  const fetchExhibit = async () => {
    try {
      const data = await getAllExhibits({
        page: 0,
        size: 5,
        sort: "name,asc",
        searchText: "",
      });

      setListExhibits(data.content);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  // Gọi API khi component load
  useEffect(() => {
    if (id) {
      fetchExhibitById(id);
    }
  }, [id]);

  return (
    <>
      <div className="exhibit-detail container">
        <div className="row">
          <div className="col-8">
            <h3 className="exhibit-title  font-w-600 pb-4 mb-4">
              {exhibit?.name}
            </h3>

            <div
              className="exhibit-content pt-4"
              dangerouslySetInnerHTML={{ __html: exhibit?.content || "" }}
            ></div>
          </div>

          <div className="col-4">
            <div className="box-right p-3">
              <h5 className="exhibit-title  font-w-500 mb-4 pt-3">
                Trưng bày khác
              </h5>
              <hr />
              {listExhibits.length > 0 ? (
                listExhibits.map((item) => (
                  <div className="box-item ">
                    <NavLink
                      to={`/exhibits/${item.id}`}
                      className="color-dark-text  multiline-truncate"
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
    </>
  );
}
