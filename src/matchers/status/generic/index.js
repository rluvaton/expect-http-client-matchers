const { toBeSuccessful } = require('./toBeSuccessful');
const { toHaveStatus } = require('./toHaveStatus');
const { toHave2xxStatus } = require('./toHave2xxStatus');
const { toHave3xxStatus } = require('./toHave3xxStatus');
const { toHave4xxStatus } = require('./toHave4xxStatus');
const { toHave5xxStatus } = require('./toHave5xxStatus');

module.exports = {
  toBeSuccessful,
  toHave2xxStatus,
  toHave3xxStatus,
  toHave4xxStatus,
  toHave5xxStatus,
  toHaveStatus,
};
