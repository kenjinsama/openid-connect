/* istanbul ignore file */

// Declarative file
import { ValidationArguments } from 'class-validator';
import { Plain } from './plain.type';
import { ReplaceSubset } from './replace-subset.type';

export type ValidationArgumentsGeneric<T> = ReplaceSubset<
  {
    object: T;
    property: keyof Plain<T>;
  },
  ValidationArguments
>;
