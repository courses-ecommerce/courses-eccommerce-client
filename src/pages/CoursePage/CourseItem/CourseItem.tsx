import { Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cartApi from "src/apis/cartApi";
import Rating from "src/components/Rating/Rating";
import useHover from "src/hooks/useHover";
import { selectAuthorization } from "src/reducers/authSlice";
import { ICourse } from "src/types";
import CourseModal from "../CourseModal/CourseModal";
import "./CourseItem.scss";

interface CourseItemProps {
  data: ICourse;
}
const CourseItem: React.FC<CourseItemProps> = ({ data }) => {
  const navigate = useNavigate();
  const { isAuth } = useSelector(selectAuthorization);

  // console.log(data);

  const { nodeRef, show } = useHover();

  const handleAddCart = async () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      const params = { course: data._id };
      console.log("params", params);

      try {
        await cartApi.addItemToCart(params);
        toast.success("Thêm vào giỏ hàng thành công", {
          position: "bottom-right",
        });
      } catch (error) {
        console.log("lỗi rồi", { error });
        toast.warning(`${error}`, {
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <div className="course-item">
      <div className="img" ref={nodeRef}>
        <img
          src={data.thumbnail}
          alt="img"
          onClick={() => navigate(`/courses/${data._id}`)}
        />
        {show && <CourseModal course={data} />}
      </div>
      <div className="content">
        <span className="name">{data.name}</span>
        <span className="author">
          <b>Tác giả: </b>
          {data.author?.fullName}
        </span>
        <span className="level">
          <b>Mức độ: </b>
          {data.level}
        </span>
        <span
          className="level"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <b>Đánh giá: </b>
          <Rating
            average_rating={data.rating?.rate}
            total_rating={data.rating?.numOfRate}
          />
        </span>
        {(data.currentPrice || 0) > 0 ? (
          <span className="current_price">
            <b>Giá: </b> {data.currentPrice}
          </span>
        ) : (
          <span className="current_price">
            <b>Giá:</b> <span className="free">Miễn phí</span>
          </span>
        )}
        <Button variant="contained" color="warning" onClick={handleAddCart}>
          Mua ngay
        </Button>
      </div>
    </div>
  );
};

export default CourseItem;
