export interface SplitOptions {
  trim?: boolean;
  limit?: number;
}

export function Split(
  separator: string | RegExp,
  { limit, trim }: SplitOptions = { trim: true },
) {
  return ({
    value,
    key,
  }: {
    value: unknown;
    key: string | Symbol;
  }): string[] => {
    if (typeof value !== 'string') {
      throw new Error(`"${key}" must contains a string.`);
    }

    return (trim ? value.trim() : value)
      .split(separator, limit)
      .map(value => (trim ? value.trim() : value));
  };
}
