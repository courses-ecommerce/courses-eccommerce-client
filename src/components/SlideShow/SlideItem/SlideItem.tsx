import { Button } from "@mui/material";
import React from "react";
import Image from "src/components/Image/Image";
import "./SlideItem.scss";

interface ImageContentProps {
  name: string;
  image: string;
  description: string;
}

interface SlideItemProps {
  imageContent: ImageContentProps;
}

const SlideItem: React.FC<SlideItemProps> = ({ imageContent }) => {
  return (
    <div className="slide-item">
      <Image src={imageContent.image} />
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
