/* istanbul ignore file */

// Declarative file
export type ReplaceSubset<R, T> = Omit<T, keyof R> & R;
