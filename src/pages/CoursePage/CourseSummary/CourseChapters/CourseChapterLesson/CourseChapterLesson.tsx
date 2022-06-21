import { Divider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectAuthorization } from "src/reducers/authSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getVideoView } from "src/reducers/authSlice";
import { LessonProps } from "src/types";
import "./CourseChapterLesson.scss";

interface CourseChapterLessonProps {
  lessons?: LessonProps[];
}

const CourseChapterLesson: React.FC<CourseChapterLessonProps> = ({
  lessons = [],
}) => {
  // console.log("leson", lessons);

  const [lesson, setLesson] = useState<LessonProps>();

  const dispatch = useDispatch();

  const { videoView } = useSelector(selectAuthorization);

  useEffect(() => {
    dispatch(getVideoView(lesson));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?._id]);

  return (
    <>
      {lessons.map((lesson: LessonProps, index) => {
        // console.log("lessons", lesson);
        return (
          <div
            key={index}
            className={
              videoView?.title === lesson?.title ? "lesson-title-active" : ""
            }
            style={{ cursor: "pointer" }}
            onClick={() => setLesson(lesson)}
          >
            <Typography>
              <b>{index + 1}. </b>
              {lesson.title}
            </Typography>
            {index < lessons.length - 1 && (
              <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            )}
          </div>
        );
      })}
    </>
  );
};

export default CourseChapterLesson;
