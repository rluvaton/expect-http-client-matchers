declare module 'expect-http-client-matchers' {
  const matchers: import('./shared').CustomMatchers<any>;
  export = matchers;
}
