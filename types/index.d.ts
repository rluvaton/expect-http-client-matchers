declare module 'expect-axios-matchers' {
  const matchers: import('./shared').CustomMatchers<any>;
  export = matchers;
}
