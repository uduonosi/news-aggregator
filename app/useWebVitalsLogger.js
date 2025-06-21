import { useEffect } from "react";

export function useWebVitalsLogger() {
  useEffect(() => {
    let unsub = null;
    async function setup() {
      try {
        const webVitals = await import("web-vitals");
        const log = (metric) => {
          console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
          window.dispatchEvent(
            new CustomEvent("web-vitals-metric", { detail: metric })
          );
        };
        webVitals.onCLS(log);
        webVitals.onLCP(log);
        webVitals.onFCP(log);
        webVitals.onTTFB(log);
      } catch (e) {
        console.warn("web-vitals not loaded:", e);
      }
    }
    setup();
    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, []);
}
