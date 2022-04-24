import React, { useEffect, useState } from "react";

const useClickOutSide = (nodeHtml?: any) => {
  const nodeRef = React.useRef<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleClickOutSide = (e: any) => {
      if (typeof nodeHtml === "string") {
        nodeRef.current &&
          !nodeRef.current.contains(e.target) &&
          !e.target.matches(nodeHtml) &&
          setShow(false);
      } else {
        nodeRef.current &&
          !nodeRef.current.contains(e.target) &&
          setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutSide);

    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [nodeHtml]);

  return { nodeRef, show, setShow };
};

export default useClickOutSide;
