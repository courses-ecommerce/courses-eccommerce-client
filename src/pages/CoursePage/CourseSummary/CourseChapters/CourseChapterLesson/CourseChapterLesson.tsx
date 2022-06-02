import { Divider, Typography } from "@mui/material";
import React from "react";
import { LessonProps } from "src/types";

interface CourseChapterLessonProps {
  lessons?: LessonProps[];
}

const CourseChapterLesson: React.FC<CourseChapterLessonProps> = ({
  lessons = [],
}) => {
  return (
    <>
      {lessons.map((lesson: LessonProps, index) => {
        return (
          <div key={index}>
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
