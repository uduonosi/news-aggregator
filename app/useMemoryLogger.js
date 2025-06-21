import { useEffect } from "react";

export function useMemoryLogger(label = "Memory Usage") {
  useEffect(() => {
    let intervalId;
    function logMemory() {
      if (
        typeof window !== "undefined" &&
        window.performance &&
        performance.memory
      ) {
        const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } =
          performance.memory;
        // Convert bytes to MB
        const usedMB = (usedJSHeapSize / 1048576).toFixed(2);
        const totalMB = (totalJSHeapSize / 1048576).toFixed(2);
        const limitMB = (jsHeapSizeLimit / 1048576).toFixed(2);
        // eslint-disable-next-line no-console
        console.log(
          `${label}: Used ${usedMB} MB / Total ${totalMB} MB (Limit: ${limitMB} MB)`
        );
      }
    }
    intervalId = setInterval(logMemory, 10000); // Log every 10 seconds
    return () => clearInterval(intervalId);
  }, [label]);
}
