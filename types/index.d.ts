interface CustomMatchers<R> extends Record<string, any> {
  toBeSuccessful(): R;
}

declare namespace jest {
  // noinspection JSUnusedGlobalSymbols
  interface Matchers<R> {
    toBeSuccessful(): R;
  }

  // noinspection JSUnusedGlobalSymbols
  interface Expect extends CustomMatchers<any> {}

  // noinspection JSUnusedGlobalSymbols
  interface InverseAsymmetricMatchers extends Expect {}
}

declare module 'expect-axios-matchers' {
  const matchers: CustomMatchers<any>;
  export = matchers;
}
