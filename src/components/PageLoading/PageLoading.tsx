import { RingLoader } from "react-spinners";
import "./PageLoading.scss";

const PageLoading = () => {
  return (
    <div className="page-loading">
      <RingLoader loading color="#7423c4" size={100} />
    </div>
  );
};

export default PageLoading;
