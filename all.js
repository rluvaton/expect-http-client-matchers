const matchers = require('./src');

const globalExpect = global.expect;
if (globalExpect !== undefined) {
  globalExpect.extend(matchers);
} else {
  throw new Error(
    'Unable to find global expect. ' +
      'Please check you have added expect-axios-matchers correctly.' +
      'See https://github.com/Tamir-M/expect-axios-matchers#setup for help.',
  );
}
