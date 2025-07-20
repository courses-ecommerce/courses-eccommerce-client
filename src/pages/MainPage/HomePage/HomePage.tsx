import { KeenSlider } from "@libs/keen-slider";
import { listSlideShow } from "src/data/mainPageInfo";

const HomePage = () => {
  return <KeenSlider.SliderContainer listSlideShow={listSlideShow} />;
};
export default HomePage;
