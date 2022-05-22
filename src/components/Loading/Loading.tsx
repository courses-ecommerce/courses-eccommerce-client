import React, { useState } from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  let [color, setColor] = useState("#8376d7");

  return <BeatLoader color={color} loading={true} size={25} />;
};

export default Loading;
