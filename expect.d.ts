import 'expect';

declare module 'expect' {
  type SharedMatchers<R> = import('./types/shared').SharedMatchers<R>;

  // noinspection JSUnusedGlobalSymbols
  interface Matchers<R> extends SharedMatchers<R> {}

  // noinspection JSUnusedGlobalSymbols
  interface AsymmetricMatchers extends SharedMatchers<AsymmetricMatcher_2> {}
}
