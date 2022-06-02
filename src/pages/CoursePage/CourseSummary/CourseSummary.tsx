import React, { useState } from "react";
import Image from "src/components/Image/Image";
import { ChaptersProps } from "src/types";
import CourseChapters from "./CourseChapters/CourseChapters";
import "./CourseSummary.scss";

interface CourseSummaryProps {
  title?: string;
  chapters?: ChaptersProps[];
}

const CourseSummary: React.FC<CourseSummaryProps> = ({
  title = "Không có tiêu đề",
  chapters = [],
}) => {
  const [panelActive, setPanelActive] = useState("");

  return (
    <div className="course-summary">
      <span className="title-summary">{title}</span>
      <div className="content-summary">
        {chapters.length > 0 ? (
          chapters.map((chapter, index) => (
            <CourseChapters
              chapters={chapter}
              key={index}
              index={index}
              onPanelActive={(e: any) => setPanelActive(e)}
              panelActive={panelActive}
            />
          ))
        ) : (
          <Image height={80} />
        )}
      </div>
    </div>
  );
};

export default CourseSummary;
