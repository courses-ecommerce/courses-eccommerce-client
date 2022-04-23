import { useEffect, useState } from "react";

export const useTypingDebounce = (initializeValue = "", delay = 1000) => {
  const [debounceValue, setDebounceValue] = useState(initializeValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initializeValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, initializeValue]);

  return debounceValue;
};

export default useTypingDebounce;
