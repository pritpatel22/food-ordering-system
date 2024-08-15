import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import style from "./style.module.css";

const TopRater = () => {
  const [plotUrl, setPlotUrl] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/reviewanalytics/")
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setPlotUrl(url);
      });
  }, []);
  return (
    <div style={{ height: "100vh", paddingTop: "100px" }}>
      <div className="row">
        <div className="col-lg-3">
          <Dashboard />
        </div>
        <div className="col-lg-9">
          <div className={style.dashboard_content}>
            <div className={style.plot_container}>
              {plotUrl && (
                <img src={plotUrl} className={style.plot_image} alt="Plot" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopRater;
