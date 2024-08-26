import 'expect-http-client-matchers/jest.d.ts';

import { matchers } from 'expect-http-client-matchers';
const { toBeSuccessful } = matchers;

expect.extend({
  toBeSuccessful,
});
