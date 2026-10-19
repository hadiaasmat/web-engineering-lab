// Promise-based delay: resolves after `ms` milliseconds.
export const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Closure: the inner function keeps using `count` after makeCounter returns.
export function makeCounter() {
  let count = 0;
  return () => ++count;
}