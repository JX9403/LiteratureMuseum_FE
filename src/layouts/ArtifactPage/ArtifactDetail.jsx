import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getAllArtifacts, getArtifactById } from "../../api/ArtifactAPI";
import { LoaderText } from "../../components/Loader/LoaderText";
import QRPopup from "../../components/QRPopup";

export default function ArtifactDetail() {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  const [listArtifacts, setListArtifacts] = useState([]);

  useEffect(() => {
    if (id) {
      fetchArtifactById(id);
    }
  }, [id]);

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const fetchArtifactById = async (artifactId) => {
    try {
      const res = await getArtifactById(artifactId);
      setArtifact(res);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
    }
  };

  const fetchArtifacts = async () => {
    try {
      const data = await getAllArtifacts({
        page: 0,
        size: 5,
        sort: "name,asc",
        searchText: "",
      });
      setListArtifacts(data.content);
    } catch (error) {
      console.error("Lỗi ", error);
    }
  };

  return (
    <div className="artifact-detail container">
      <div className="row mb-5">
        {/* Bên trái: tiêu đề và nội dung */}
        <div className="col-md-7">
          <h3 className="artifact-title font-w-600 pb-3">{artifact?.name}</h3>
          <div
            className="artifact-content"
            dangerouslySetInnerHTML={{ __html: artifact?.content || "" }}
          ></div>
        </div>

        {/* Bên phải: mô hình 3D */}
        <div className="col-md-5">
          {artifact?.model && (
            <div className="artifact-model mb-3">
              <model-viewer
                src={artifact.model}
                auto-rotate
                camera-controls
                style={{ width: "100%", height: "500px" }}
              ></model-viewer>
            </div>
          )}

          {artifact && (
            <div>
              <QRPopup model={artifact} />
            </div>
          )}
        </div>
      </div>

      {/* Dưới: Trưng bày khác */}
      <div className="row pb-4">
        <div className="col-12">
          <div className="box-right p-3">
            <h5 className="artifact-title font-w-500 mb-4 pt-3">
              Trưng bày khác
            </h5>
            <hr />
            {listArtifacts.length > 0 ? (
              listArtifacts.map((item) => (
                <div className="box-item" key={item.id}>
                  <NavLink
                    to={`/artifacts/${item.id}`}
                    className="color-dark-text multiline-truncate"
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
  );
}
