import { useEffect } from "react";
import slide1 from "../../assets/images/Slide1.jpg";
import { NavLink } from "react-router-dom";
const Map = () => {
  useEffect(() => {
    const mapDataScript = document.createElement("script");
    mapDataScript.src = "/mapdata.js";

    mapDataScript.onload = () => {
      const mapScript = document.createElement("script");
      mapScript.src = "/countrymap.js";

      mapScript.onload = () => {
        setTimeout(() => {
          const mapDiv = document.getElementById("map");
          console.log("Map innerHTML:", mapDiv.innerHTML);

          const regions = document.querySelectorAll("#map path");

          console.log("Number of regions found:", regions.length);

          regions.forEach((region) => {
            region.addEventListener("click", (e) => {
              const target = e.target;
              const regionClass = Array.from(target.classList).find((c) =>
                c.startsWith("sm_state_VN")
              );
              console.log("Clicked region:", regionClass);

              const infoDiv = document.getElementById("info");
              if (infoDiv) {
                infoDiv.innerText = regionClass || "Không xác định";
              }
            });
          });
        }, 500);
      };

      document.body.appendChild(mapScript);
    };

    document.body.appendChild(mapDataScript);

    return () => {
      if (mapDataScript.parentNode)
        mapDataScript.parentNode.removeChild(mapDataScript);
    };
  }, []);

  return (
    <div className="section-maps">
      <div className="page-header">
        <div className="overlay">
          <h1 className="header-text-top color-light-text ">BẢN ĐỒ VĂN HỌC</h1>
          <div className="header-text color-light-text ">
            <NavLink to="/" className="color-light-text">
              Trang chủ
            </NavLink>
            <span className="separator color-light-text"> / </span>
            <NavLink to="/map" className="color-light-text">
              Bản đồ văn học Việt Nam
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

      <div className="page-body d-flex ">
        <div id="map" style={{ width: "100%", height: "600px" }}></div>

        <div id="info"></div>
      </div>
    </div>
  );
};

export default Map;
