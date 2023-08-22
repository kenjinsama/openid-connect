/* istanbul ignore file */

// Declarative file
export type Plain<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: Plain<T[K]>;
};
