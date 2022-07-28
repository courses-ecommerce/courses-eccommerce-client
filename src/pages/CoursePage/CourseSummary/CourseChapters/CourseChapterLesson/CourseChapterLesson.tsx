import { Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthorization } from "src/reducers/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getVideoView } from "src/reducers/authSlice";
import { LessonProps } from "src/types";
import "./CourseChapterLesson.scss";
import classNames from "classnames";
import Icon from "src/components/Icon/Icon";

interface CourseChapterLessonProps {
  chapterNumber?: number;
  lessons?: LessonProps[];
}

const CourseChapterLesson: React.FC<CourseChapterLessonProps> = ({
  chapterNumber = 0,
  lessons = [],
}) => {
  // console.log("lesson", lessons);

  const [lesson, setLesson] = useState<LessonProps>();

  const dispatch = useDispatch();

  const { videoView } = useSelector(selectAuthorization);

  useEffect(() => {
    lesson && dispatch(getVideoView(lesson));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?._id]);

  return (
    <>
      {lessons.map((lesson: LessonProps, index) => {
        // console.log("lessons", lesson.complete);
        return (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => setLesson(lesson)}
          >
            <Typography
              sx={{ padding: 1.5, textTransform: "capitalize" }}
              className={classNames(
                videoView?.title === lesson?.title ? "lesson-title-active" : "",
                lesson.complete ? "lesson-title-complete" : ""
              )}
            >
              <b>
                {chapterNumber + 1}.{index + 1}{" "}
              </b>
              {lesson.title}{" "}
              {lesson.complete && <Icon icon="check" size={18} />}
            </Typography>
            {index < lessons.length - 1 && <Divider />}
          </div>
        );
      })}
    </>
  );
};

export default CourseChapterLesson;
