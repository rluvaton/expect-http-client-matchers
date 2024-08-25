import { AsymmetricMatchers } from 'expect';

export type ExpectAsymmetricMatcher = ReturnType<AsymmetricMatchers['stringContaining']>;
export type WrapWithPossibleAsymmetricMatcher<T> =
  | T
  | ExpectAsymmetricMatcher
  | (T extends any[] ? ExpectAsymmetricMatcher[] | (T[number] | ExpectAsymmetricMatcher)[] : never)
  | (T extends Record<string, any> ? { [K in keyof T]: WrapWithPossibleAsymmetricMatcher<T[K]> } : never);

export type AllowPossibleAsymmetricMatcherInKeys<T extends Record<string, any>> =
  | T
  | (T extends Record<string, any> ? { [K in keyof T]: WrapWithPossibleAsymmetricMatcher<T[K]> } : never);
