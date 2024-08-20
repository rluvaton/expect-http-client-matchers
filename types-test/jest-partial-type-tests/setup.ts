import 'expect-http-client-matchers/jest.d.ts';

import { toBeSuccessful } from 'expect-http-client-matchers';

expect.extend({
  toBeSuccessful,
});
