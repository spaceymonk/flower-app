import { throwErrorIfUndefined } from '../util';

export class Optional<T> {
  private _value: T | undefined;

  constructor(value: T | undefined) {
    this._value = value;
  }

  get value(): T {
    return throwErrorIfUndefined(this._value, 'Value is not present');
  }

  get isPresent(): boolean {
    return this._value !== undefined;
  }

  orElse<U>(defaultValue: U): T | U {
    return this._value !== undefined ? this._value : defaultValue;
  }

  orElseThrow(error: Error): T {
    if (this._value === undefined) {
      throw error;
    }
    return this._value;
  }
}
