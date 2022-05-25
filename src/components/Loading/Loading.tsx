import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  let [color] = useState("#8376d7");

  return <BeatLoader color={color} loading={true} size={10} />;
};

export default Loading;
