import { Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "src/components/Rating/Rating";
import useHover from "src/hooks/useHover";
import { ICourse } from "src/types";
import { numberLocale, numberRound, translateVi } from "src/utils";
import BtnAddCart from "../BtnAddCart/BtnAddCart";
import CourseModal from "../CourseModal/CourseModal";
import "./CourseItem.scss";

interface CourseItemProps {
  data: ICourse;
}
const CourseItem: React.FC<CourseItemProps> = ({ data }) => {
  const navigate = useNavigate();

  // console.log(data);

  const { nodeRef, show } = useHover();

  return (
    <div className="course-item">
      <div className="img" ref={nodeRef}>
        {numberRound(data.saleOff) > 0 && (
          <span className="sale-off">-{numberRound(data.saleOff)}%</span>
        )}
        <img
          src={data.thumbnail}
          alt="img"
          // onClick={() => navigate(`/courses/${data._id}`)}
          onClick={() => navigate(`/courses/${data.slug}`)}
        />
        {show && <CourseModal course={data} />}
      </div>
      <div className="content">
        <Tooltip title={data.name || ""}>
          <span className="name">{data.name}</span>
        </Tooltip>
        <Tooltip
          title="Xem trang cá nhân"
          onClick={() =>
            data.author?._id && navigate(`/user/${data.author?._id}`)
          }
        >
          <span className="author" style={{ cursor: "pointer" }}>
            <b>Tác giả: </b>
            {data.author?.fullName}
          </span>
        </Tooltip>
        <span className="level">
          <b>Dành cho: </b>
          {translateVi(data.level)}
        </span>
        {/* hot tags */}
        <span className="sell-number">
          <span className="amount">
            <b>Số lượng bán được: </b>
            {data.sellNumber}
          </span>
          {data.type && <span className="tags">Đang {data.type}</span>}
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

        <BtnAddCart courseId={data._id} isBought={data.isBuyed} />
      </div>
    </div>
  );
};

export default CourseItem;
