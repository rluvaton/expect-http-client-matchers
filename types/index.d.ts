interface CustomMatchers<R> extends Record<string, any> {
  toBeSuccessful(): R;

  toHave2xxStatus(): R;
}

// noinspection JSUnusedGlobalSymbols
interface SharedMatchers<R> {
  toBeSuccessful(): R;

  toHave2xxStatus(): R;
}

// biome-ignore lint/style/noNamespace: jest-extended do this
declare namespace jest {
  // noinspection JSUnusedGlobalSymbols
  interface Matchers<R> extends SharedMatchers<R> {}

  // noinspection JSUnusedGlobalSymbols
  interface Expect extends CustomMatchers<any> {}

  // noinspection JSUnusedGlobalSymbols
  interface InverseAsymmetricMatchers extends Expect {}
}

// declare module 'expect' {
//   // noinspection JSUnusedGlobalSymbols
//   interface Matchers<R> extends SharedMatchers<R> {}
//
//   // noinspection JSUnusedGlobalSymbols
//   interface Expect extends CustomMatchers<any> {}
//
//   // noinspection JSUnusedGlobalSymbols
//   interface InverseAsymmetricMatchers extends Expect {}
// }

declare module 'expect-axios-matchers' {
  const matchers: CustomMatchers<any>;
  export = matchers;
}
