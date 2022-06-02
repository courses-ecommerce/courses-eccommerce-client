import { Rating as MuiRating } from "@mui/material";
import React from "react";
import "./Rating.scss";

interface RatingProps {
  average_rating?: number;
  total_rating?: number;
  isReadOnly?: boolean;
  precision?: number;
}

const Rating: React.FC<RatingProps> = ({
  average_rating = 0,
  total_rating = 0,
  isReadOnly = true,
  precision = 0.5,
}) => {
  return (
    <div className="rating-container">
      <MuiRating
        className="ratings"
        value={average_rating}
        readOnly={isReadOnly}
        precision={precision}
      />
      <span className="reviewers">{total_rating} người đánh giá</span>
    </div>
  );
};

export default Rating;
