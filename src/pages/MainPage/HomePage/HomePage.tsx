import React from "react";
import SlideShow from "src/components/SlideShow/SlideShow";
import { listSlideShow } from "src/data/data";

const HomePage = () => {
  return <SlideShow listSlideShow={listSlideShow} />;
};
export default HomePage;
