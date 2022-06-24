import { Button, Tooltip } from "@mui/material";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "src/components/Image/Image";
import Rating from "src/components/Rating/Rating";
import { IMyCourse } from "src/types/myCourse";
import RatingMyCourse from "../RatingMyCourse/RatingMyCourse";
import "./MyCourseItem.scss";

interface MyCourseItemProps {
  data?: IMyCourse;
  isUpdate?: (status: boolean) => void;
}

const MyCourseItem: React.FC<MyCourseItemProps> = ({ data, isUpdate }) => {
  console.log("my course item", data);
  const navigate = useNavigate();
  const [showRating, setShowRating] = useState<boolean>(false);

  useEffect(() => {
    isUpdate?.(showRating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showRating]);

  return (
    <>
      <div className="my-course-item">
        <div
          className="course-thumbnail"
          onClick={() => navigate(`${data?._id}`)}
        >
          <Image src={data?.course?.thumbnail} />
        </div>
        <div className="course-info">
          <Tooltip title={data?.course?.name || ""}>
            <span
              className="name"
              onClick={() => navigate(`/courses/${data?.course?.slug}`)}
            >
              {data?.course?.name}
            </span>
          </Tooltip>
          <span className="author">
            <b>Tác giả: </b>
            {data?.course?.author?.fullName}
          </span>
          <span
            className={classNames(
              "progress-learning",
              !data?.percentProgress ? "nonView" : ""
            )}
          >
            {data?.percentProgress
              ? data?.percentProgress + "/100"
              : "Chưa xem"}
            <span
              className="percent"
              style={{
                width: data?.percentProgress ? `${data?.percentProgress}%` : 0,
              }}
            ></span>
          </span>
          <span className="rating">
            {/* <b>Đánh giá: </b> */}
            <Rating
              average_rating={data?.rating?.rate}
              isShowTotalRating={false}
            />
            {data?.rating ? (
              <Button
                variant="contained"
                color="warning"
                onClick={() => setShowRating(true)}
              >
                Đánh giá lại
              </Button>
            ) : (
              <Button variant="contained" onClick={() => setShowRating(true)}>
                Đánh giá ngay
              </Button>
            )}
          </span>
        </div>
      </div>
      <RatingMyCourse
        slug={data?.course?.slug}
        show={showRating}
        value={data?.rating}
        onClose={() => setShowRating(false)}
        setShow={setShowRating}
      />
    </>
  );
};
export default MyCourseItem;
