const { printDiffOrStringify } = require('jest-matcher-utils');

// Due to Jest bug with accessing getters that throw errors
// and failing the matcher we can't test this
// https://github.com/jestjs/jest/issues/15280
function canTestSnapshot() {
  try {
    printDiffOrStringify(
      {},
      {
        get a() {
          throw new Error('simulate error');
        },
      },
      'expected',
      'received',
      false,
    );

    // If it does not throw an error that we can create snapshot when there is a getter that throws an error
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = {
  canTestSnapshot,

  shouldTestAsymmetricMatcherErrorsSnapshot(testClient) {
    return testClient.name === 'got' && canTestSnapshot();
  },
};
