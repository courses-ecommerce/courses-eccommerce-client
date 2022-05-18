import React from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SliderProps {
  data: Array<string>;
}

const SlideShow: React.FC<SliderProps> = ({ data }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <Slider {...settings}>
      {data.length > 0 &&
        data.map((item, index) => (
          <div key={index}>
            <h3>{item}</h3>
          </div>
        ))}
    </Slider>
  );
};

export default SlideShow;
