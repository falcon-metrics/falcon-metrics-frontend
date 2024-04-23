import { RequiredKeys } from './types';

export function asRequiredKeys<
  T extends Record<string | number | symbol, unknown>
>(obj: T) {
  return obj as RequiredKeys<T>;
}

export function isObject(
  arg: unknown,
): arg is Record<string | symbol | number, unknown> {
  return typeof arg === 'object' && arg !== null;
}

export function isStringRecord(arg: unknown): arg is Record<string, unknown> {
  return isObject(arg) && !Object.keys(arg).some((k) => typeof k !== 'string');
}

export const isDefined = <T>(input: T | undefined | null): input is T => {
  return typeof input !== 'undefined' && input !== null;
};

export function asTuple<T extends Array<unknown>>(...args: T): T {
  return args;
}

export function isKeyOf<T>(
  key: string | number | symbol,
  obj: T,
): key is keyof T {
  return key in obj;
}
