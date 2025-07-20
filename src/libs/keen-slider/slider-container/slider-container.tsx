import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { SlideItem } from "../slider-item/slider-item";
import { SliderBanner } from "src/types";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "./slider-container.scss";

interface SliderContainerProps {
  listSlideShow: SliderBanner[];
}

export const SliderContainer: React.FC<SliderContainerProps> = ({
  listSlideShow,
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const prev = () => slider.current?.prev();
  const next = () => slider.current?.next();

  return (
    <div className="slider-wrapper">
      <div className="keen-slider" ref={sliderRef}>
        {listSlideShow.map((imageContent, index) => (
          <div className="keen-slider__slide" key={index}>
            <SlideItem imageContent={imageContent} />
          </div>
        ))}
      </div>

      <div className="btns-slider slider-left" onClick={prev}>
        <KeyboardArrowLeftIcon />
      </div>

      <div className="btns-slider slider-right" onClick={next}>
        <KeyboardArrowRightIcon />
      </div>

      <div className="paging-icons">
        {listSlideShow.map((_, idx) => (
          <FiberManualRecordIcon
            key={idx}
            color={currentSlide === idx ? "primary" : "disabled"}
            onClick={() => slider.current?.moveToIdx(idx)}
            fontSize="small"
          />
        ))}
      </div>
    </div>
  );
};
