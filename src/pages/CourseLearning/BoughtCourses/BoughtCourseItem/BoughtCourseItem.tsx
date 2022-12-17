import { Button, Tooltip } from "@mui/material";
import classNames from "classnames";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "src/components/Image/Image";
import Rating from "src/components/Rating/Rating";
import { IMyCourse } from "src/types/myCourse";
import formatCharacter from "src/utils/formatCharacter";
import RatingBoughtCourse from "../RatingBoughtCourse/RatingBoughtCourse";

import "./BoughtCourseItem.scss";

interface BoughtCourseItemProps {
  courseInfo?: IMyCourse;
  isUpdate?: (status: boolean) => void;
}

const BoughtCourseItem: React.FC<BoughtCourseItemProps> = ({
  courseInfo,
  isUpdate,
}) => {
  // console.log("my course item", courseInfo);
  const navigate = useNavigate();
  const [showRating, setShowRating] = useState<boolean>(false);

  // useEffect(() => {
  //   isUpdate?.(showRating);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [showRating]);

  return (
    <React.Fragment>
      <div className="my-course-item">
        <div
          className="course-thumbnail"
          onClick={() => navigate(`${courseInfo?._id}`)}
        >
          <Image src={courseInfo?.course?.thumbnail} />
        </div>
        <div className="course-info">
          <Tooltip title={courseInfo?.course?.name || ""}>
            <span
              className="name"
              onClick={() => navigate(`/courses/${courseInfo?.course?.slug}`)}
            >
              {courseInfo?.course?.name}
            </span>
          </Tooltip>
          <span className="author">
            <b>Tác giả: </b>
            {courseInfo?.course?.author?.fullName}
          </span>
          <span
            className={classNames(
              "progress-learning",
              !courseInfo?.percentProgress ? "nonView" : ""
            )}
          >
            <span className="progress-number">
              {courseInfo?.percentProgress
                ? formatCharacter.numberRound(courseInfo?.percentProgress) +
                  "/100"
                : "Chưa xem"}
            </span>
            <span
              className="percent"
              style={{
                width: courseInfo?.percentProgress
                  ? `${courseInfo?.percentProgress}%`
                  : 0,
              }}
            ></span>
          </span>
          <span className="rating">
            {/* <b>Đánh giá: </b> */}
            <Rating
              average_rating={courseInfo?.rating?.rate}
              isShowTotalRating={false}
            />
            {courseInfo?.rating ? (
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
      <RatingBoughtCourse
        isUpdate={(status) => isUpdate?.(status)}
        slug={courseInfo?.course?.slug}
        show={showRating}
        value={courseInfo?.rating}
        onClose={() => setShowRating(false)}
        setShow={setShowRating}
      />
    </React.Fragment>
  );
};
export default BoughtCourseItem;
