function toBeSuccessful(expected) {
  const { matcherHint, printReceived } = this.utils;

  const pass = typeof expected === 'number' && expected >= 200 && expected <= 299;

  return {
    pass,
    message: () =>
      pass
        ? matcherHint('not.toBeSuccessful', 'received', '') +
          '\n\n' +
          'Expected value to not be successful received:\n' +
          `  ${printReceived(expected)}`
        : matcherHint('.toBeSuccessful', 'received', '') +
          '\n\n' +
          'Expected value to be successful received:\n' +
          `  ${printReceived(expected)}`,
  };
}

module.exports = { toBeSuccessful };
