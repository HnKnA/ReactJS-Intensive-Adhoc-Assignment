import React from "react";

// Small helper that wraps a dynamic import in a delay
function lazyWithDelay<T extends React.ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  delay = 1500 // 1.5 seconds by default
) {
  return new Promise<{ default: T }>((resolve) => {
    setTimeout(() => {
      factory().then(resolve);
    }, delay);
  });
}

export function lazyLoadWithDelay<T extends React.ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>,
  delay?: number
) {
  return React.lazy(() => lazyWithDelay(factory, delay));
}
