const { toBeSuccessful } = require('./matchers/toBeSuccessful');
const { toHave2xxStatus } = require('./matchers/toHave2xxStatus');
const { toHave3xxStatus } = require('./matchers/toHave3xxStatus');
const { toHave4xxStatus } = require('./matchers/toHave4xxStatus');
const { toHave5xxStatus } = require('./matchers/toHave5xxStatus');

module.exports = { toBeSuccessful, toHave2xxStatus, toHave3xxStatus, toHave4xxStatus, toHave5xxStatus };
