import { Backdrop } from "@mui/material";
import { RingLoader } from "react-spinners";

const PageLoading = () => {
  return (
    <Backdrop
      open
      sx={{
        backgroundColor: "rgba(248, 248, 248, 0.5)",
        zIndex: 99999,
      }}
    >
      <RingLoader loading color="#7423c4" size={100} />
    </Backdrop>
  );
};

export default PageLoading;
