import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PorfolioPage.scss";

const PorfolioPage = () => {
  document.title = "Thông tin chi tiết giảng viên";
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      <div className="navs">
        <span onClick={() => navigate(-1)}>Quay lại trang trước</span>
      </div>
      <div className="porfolio-page"></div>
    </>
  );
};

export default PorfolioPage;
