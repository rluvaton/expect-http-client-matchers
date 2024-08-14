import 'expect';

declare module 'expect' {
  type SharedMatchers<R> = import('./types/shared').SharedMatchers<R>;
  type CustomMatchers<R> = import('./types/shared').CustomMatchers<R>;

  // noinspection JSUnusedGlobalSymbols
  interface Matchers<R> extends SharedMatchers<R> {}

  // noinspection JSUnusedGlobalSymbols
  interface Expect extends CustomMatchers<any> {}

  // noinspection JSUnusedGlobalSymbols
  interface InverseAsymmetricMatchers extends Expect {}
}
