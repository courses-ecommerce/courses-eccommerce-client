import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import teacherApi from "src/apis/teacherApi";
import "./PorfolioPage.scss";

const PorfolioPage = () => {
  document.title = "Thông tin chi tiết giảng viên";
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getInfoTeacher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getInfoTeacher = async () => {
    try {
      const response = await teacherApi.getTeacherInfoById(id);
      console.log("response", response);
    } catch (error) {
      console.log("lỗi rỗi", { error });
    }
  };

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
