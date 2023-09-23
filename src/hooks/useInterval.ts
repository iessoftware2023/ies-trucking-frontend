/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number): void => {
  const savedCallback = useRef<() => void>(() => {});
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const runTask = async () => {
      // Perform an asynchronous task here
      await savedCallback.current();

      // Schedule the next interval
      if (delay > 0) {
        timeoutId.current = setTimeout(runTask, delay);
      }
    };

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    // Start the task
    runTask();

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [delay]);
};
