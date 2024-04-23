export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type OptionalExcept<T, K extends keyof T> = Pick<T, K> &
  Omit<Partial<T>, K>;

export type ReplaceKeyTypes<Original extends Object, New extends Object> = Omit<
  Original,
  keyof New
> &
  New;

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

/**
 * Returns the list of keys in the @param Base type that extend the @param Condition type.
 */
export type AllowedNames<Base, Condition> = FilterFlags<
  Base,
  Condition
>[keyof Base];

export type SubType<Base, Condition> = Pick<
  Base,
  AllowedNames<Base, Condition>
>;

export type WithoutKeys<T, ReservedAttributes> = Omit<
  T,
  keyof ReservedAttributes
> &
  {
    [P in Extract<keyof T, keyof ReservedAttributes>]?: never;
  };

export type RequiredKeys<
  T extends Record<string | number | symbol, unknown>
> = {
  [K in keyof Required<T>]: Exclude<T[K], undefined> extends Record<
    string | number | symbol,
    unknown
  >
    ? RequiredKeys<Exclude<T[K], undefined>>
    : T[K];
};

export type TransformedName<
  Name extends string,
  Prefix extends string | undefined = undefined,
  Suffix extends string | undefined = undefined
> = `${Prefix extends string ? Prefix : ''}${Prefix extends string
  ? Capitalize<Name>
  : Name}${Suffix extends string ? Suffix : ''}`;

export type ArrayItemType<T extends unknown[]> = T extends (infer U)[]
  ? U
  : never;

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
