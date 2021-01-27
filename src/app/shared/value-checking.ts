export const isNullOrUndefined = (value: unknown): boolean => value === null || value === undefined;

export const isEmptyNullOrUndefined = (value: unknown) => value === "" || isNullOrUndefined(value);
