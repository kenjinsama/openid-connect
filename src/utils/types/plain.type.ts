/* istanbul ignore file */

// Declarative file
import { Primitive } from './primitive.type';

type Methods<T> = {
  // For each K in T
  [K in keyof T]: T[K] extends Function ? K : never; // If T[K] is a function, include it, else, exclude it
}[keyof T]; // Get the union of all function names

type NonPrimitive<T> = T extends Primitive ? never : T;

/**
 * @warning This type preserves primitives and arrays methods
 */
export type Plain<T> = Omit<
  {
    // For each K in T
    [K in keyof T]: T[K] extends Array<infer E> // If T[K] is an array, infer E its element
      ? E extends NonPrimitive<E> // If E is any non primitive
        ? Array<Plain<E>> // Then we need to Plain<E> too
        : T[K] // Else, E is a primitive, then T[K] is a primitive array and we can just use it as is
      : T[K] extends NonPrimitive<T[K]> // Else if T[K] is any non primitive
      ? Plain<T[K]> // Then we need to Plain<E> too
      : T[K]; // Else, T[K] is a primitive, we can just use it as is
  },
  Methods<T> // Exclude all functions from the resulting type
>;
