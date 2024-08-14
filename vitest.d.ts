// Vitest support jest expect, so it's the same as in jest.d.ts

// biome-ignore lint/style/noNamespace: jest-extended do this
declare namespace jest {
  type SharedMatchers<R> = import('./types/shared').SharedMatchers<R>;
  type CustomMatchers<R> = import('./types/shared').CustomMatchers<R>;

  // noinspection JSUnusedGlobalSymbols
  interface Matchers<R> extends SharedMatchers<R> {}

  // noinspection JSUnusedGlobalSymbols
  interface Expect extends CustomMatchers<any> {}

  // noinspection JSUnusedGlobalSymbols
  interface InverseAsymmetricMatchers extends Expect {}
}
