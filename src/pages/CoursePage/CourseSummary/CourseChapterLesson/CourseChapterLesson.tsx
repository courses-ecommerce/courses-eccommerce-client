import { Divider, Typography } from "@mui/material";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaContent from "src/components/MediaContent";
import TextContent from "src/components/TextContent";
import { getVideoView, selectAuthorization } from "src/reducers";
import { LessonProps } from "src/types";
import "./CourseChapterLesson.scss";

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
    <React.Fragment>
      {lessons.map((lesson: LessonProps, index) => {
        // console.log("lessons", lesson);
        return (
          <div
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => setLesson(lesson)}
          >
            <Typography
              sx={{ padding: 6, textTransform: "capitalize" }}
              className={classNames(
                videoView?.title === lesson?.title ? "lesson-title-active" : "",
                lesson.complete ? "lesson-title-complete" : ""
              )}
            >
              <TextContent.NormalText
                type="title-content"
                content={`${chapterNumber + 1}.${index + 1} `}
              />
              <TextContent.NormalText
                type="description"
                content={lesson.title + ""}
              />
              {lesson.complete && <MediaContent.Icon icon="check" size={18} />}
            </Typography>
            {index < lessons.length - 1 && <Divider />}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default CourseChapterLesson;
