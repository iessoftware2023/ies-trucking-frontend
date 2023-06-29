import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number): void => {
  const savedCallback = useRef(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!savedCallback) {
      return;
    }

    const handler = (...args: unknown[]) => savedCallback.current(...args);

    if (delay !== null) {
      const id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
