const { matchers } = require('./src');

const globalExpect = global.expect;
if (globalExpect !== undefined) {
  globalExpect.extend(matchers);
} else {
  throw new Error(
    'Unable to find global expect. ' +
      'Please check you have added expect-http-client-matchers correctly.' +
      'See https://github.com/rluvaton/expect-http-client-matchers#setup for help.',
  );
}
