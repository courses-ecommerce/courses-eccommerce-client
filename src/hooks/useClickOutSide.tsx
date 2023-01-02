import React, { useEffect, useState } from "react";

const useClickOutSide = (nodeHtml?: string) => {
  const nodeRef = React.useRef<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleClickOutSide = (event: Event) => {
      const target = event.target as HTMLTextAreaElement;

      if (!nodeRef.current) return;

      if (nodeHtml) {
        !nodeRef.current.contains(target) &&
          target.matches(nodeHtml) &&
          setShow(false);
      } else {
        !nodeRef.current.contains(target) && setShow(false);
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
