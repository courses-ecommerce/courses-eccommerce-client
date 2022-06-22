import { Button, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cartApi from "src/apis/cartApi";
import Loading from "src/components/Loading/Loading";
import Rating from "src/components/Rating/Rating";
import useHover from "src/hooks/useHover";
import { getTotalCart, selectAuthorization } from "src/reducers/authSlice";
import { ICourse } from "src/types";
import { numberLocale, numberRound } from "src/utils";
import CourseModal from "../CourseModal/CourseModal";
import "./CourseItem.scss";

interface CourseItemProps {
  data: ICourse;
}
const CourseItem: React.FC<CourseItemProps> = ({ data }) => {
  const navigate = useNavigate();

  const { isRole } = useSelector(selectAuthorization);
  const { isAuth } = useSelector(selectAuthorization);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  // console.log(data);

  const { nodeRef, show } = useHover();

  const handleAddCart = async () => {
    if (!isAuth) {
      navigate("/login");
    } else {
      const params = { course: data._id };
      setIsLoading(true);
      try {
        const response = await cartApi.addItemToCart(params);
        setIsLoading(false);
        const { carts }: any = response;
        // console.log("carts", carts.length);
        dispatch(getTotalCart(carts.length));
        toast.success("Thêm vào giỏ hàng thành công", {
          position: "bottom-right",
        });
      } catch (error) {
        console.log("lỗi rồi", { error });
        setIsLoading(false);
        toast.warning(`${error}`, {
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <div className="course-item">
      <div className="img" ref={nodeRef}>
        <span className="sale-off">-{numberRound(data.saleOff)}%</span>
        <img
          src={data.thumbnail}
          alt="img"
          // onClick={() => navigate(`/courses/${data._id}`)}
          onClick={() => navigate(`/courses/${data._id}`)}
        />
        {show && <CourseModal course={data} />}
      </div>
      <div className="content">
        <Tooltip title={data.name || ""}>
          <span className="name">{data.name}</span>
        </Tooltip>
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
            <b>Giá: </b> {numberLocale(data.currentPrice, " đồng")}
            <span className="original_price">
              {numberLocale(data.originalPrice, " đồng")}
            </span>
          </span>
        ) : (
          <span className="current_price">
            <b>Giá:</b> <span className="free">Miễn phí</span>
          </span>
        )}
        <Button
          variant="contained"
          color="warning"
          onClick={handleAddCart}
          disabled={isLoading || (isRole !== "student" && isRole !== "")}
        >
          {!isLoading ? (
            isRole === "student" || !isRole ? (
              "Mua khoá học ngay"
            ) : (
              "Học sinh mới được mua"
            )
          ) : (
            <Loading />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CourseItem;
