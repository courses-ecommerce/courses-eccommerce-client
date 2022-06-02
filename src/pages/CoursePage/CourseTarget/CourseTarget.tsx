import React from "react";
import Image from "src/components/Image/Image";
import "./CourseTarget.scss";

interface CourseTargetProps {
  title?: string;
  content?: string[];
}

const CourseTarget: React.FC<CourseTargetProps> = ({
  title = "Chưa có title",
  content = [],
}) => {
  // console.log("dá", content);

  return (
    <div className="course-target">
      <span className="title-target">{title}</span>
      <div className="content-target">
        {content.length > 0 ? (
          content?.map((target, index) => <span key={index}>- {target}</span>)
        ) : (
          <Image height={100} />
        )}
      </div>
    </div>
  );
};

export default CourseTarget;
