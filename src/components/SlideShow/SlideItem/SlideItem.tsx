import { Button } from "@mui/material";
import React from "react";
import "./SlideItem.scss";

interface SlideItemProps {
  imageContent: any;
}

const SlideItem: React.FC<SlideItemProps> = ({ imageContent }) => {
  return (
    <div className="slide-item">
      <img src={imageContent.image} alt="img content" />
      <div className="slide-item-content">
        <span className="name">{imageContent.name}</span>
        <span className="description">{imageContent.description}</span>
        <Button variant="contained" color="success">
          Mua ngay
        </Button>
      </div>
    </div>
  );
};

export default SlideItem;
