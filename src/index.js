const { toBeSuccessful } = require('./matchers/toBeSuccessful');
const { toHave2xxStatus } = require('./matchers/toHave2xxStatus');
const { toHave3xxStatus } = require('./matchers/toHave3xxStatus');

module.exports = { toBeSuccessful, toHave2xxStatus, toHave3xxStatus };
