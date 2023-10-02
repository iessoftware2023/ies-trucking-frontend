/* eslint-disable @typescript-eslint/no-empty-function */
import { useEffect, useRef } from "react";

export const useInterval = (
  callback: (isRefresh: boolean) => void,
  delay: number,
  deps = []
): void => {
  const savedCallback = useRef<(isRefresh: boolean) => void>(() => {});
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const runTask = async (isRefresh: boolean) => {
      // Perform an asynchronous task here
      await savedCallback.current(isRefresh);

      // Schedule the next interval
      if (delay > 0) {
        timeoutId.current = setTimeout(() => runTask(true), delay);
      }
    };

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    // Start the task
    runTask(false);

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);
};
