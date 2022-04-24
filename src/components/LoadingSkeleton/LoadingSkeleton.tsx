import React from "react";
import "./LoadingSkeleton.scss";

interface LoadingSkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = "100%",
  height = "200px",
  borderRadius = "0",
}) => {
  return (
    <div className="skeleton" style={{ width, height, borderRadius }}></div>
  );
};

export default LoadingSkeleton;
