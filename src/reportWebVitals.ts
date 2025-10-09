import { onCLS, onLCP, onINP, Metric } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void): void => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onCLS(onPerfEntry);
    onLCP(onPerfEntry);
    onINP(onPerfEntry);
  }
};

export default reportWebVitals;
