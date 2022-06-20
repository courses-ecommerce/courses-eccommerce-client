import { Box } from "@mui/material";
import React from "react";
import CoursesHot from "./CoursesHot";
import CourseTotal from "./CourseTotal";

export default function CoursesStatistic() {
  return (
    <Box
      sx={{
        marginTop: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <CourseTotal />
      <CoursesHot />
    </Box>
  );
}
