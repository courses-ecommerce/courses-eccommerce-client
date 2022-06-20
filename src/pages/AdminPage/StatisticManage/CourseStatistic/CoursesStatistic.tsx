import { Box } from "@mui/material";
import React from "react";
import CoursesHot from "./CoursesHot";
import CourseTotal from "./CourseTotal";

export default function CoursesStatistic() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <CourseTotal />
      <CoursesHot />
    </Box>
  );
}
