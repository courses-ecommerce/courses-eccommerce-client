import React from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideItem from "./SlideItem/SlideItem";
//icon
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
//scss
import "./SlideShow.scss";

interface SliderProps {
  listSlideShow: Array<any>;
}

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className="btn-left" onClick={onClick}>
      <KeyboardArrowLeftIcon />
    </div>
  );
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className="btn-right" onClick={onClick}>
      <KeyboardArrowRightIcon />
    </div>
  );
}

const SlideShow: React.FC<SliderProps> = ({ listSlideShow }) => {
  var settings = {
    // dots: true,
    speed: 500,

    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    autoplay: true,
    cssEase: "linear",
    prevArrow: <NextArrow />,
    nextArrow: <PrevArrow />,
  };
  return (
    <Slider {...settings} className="slide-show">
      {listSlideShow.length > 0 &&
        listSlideShow.map((imageContent, index) => (
          <SlideItem key={index} imageContent={imageContent} />
        ))}
    </Slider>
  );
};

export default SlideShow;
