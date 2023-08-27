type ParseIntOptions = {
  base?: number;
};

export function ParseInt(options?: ParseIntOptions) {
  const base = options?.base;

  return ({ value, key }: { value: unknown; key: string | Symbol }): number => {
    if (typeof value !== 'string') {
      throw new Error(`"${key}" must contains a string.`);
    }

    return parseInt(value, base);
  };
}
