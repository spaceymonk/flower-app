// make sure that the string you type is a property on a given object.
export const nameof = <T>(name: keyof T) => name;

export const throwErrorIfNull = <T>(value: T | null, errorMsg = 'Value cannot be null'): any => {
  if (value === null) {
    throw new Error(errorMsg);
  }
  return value;
};

export const throwErrorIfUndefined = <T>(value: T | undefined, errorMsg = 'Value cannot be undefined'): T => {
  if (typeof value === 'undefined') {
    throw new Error(errorMsg);
  }
  return value;
};
