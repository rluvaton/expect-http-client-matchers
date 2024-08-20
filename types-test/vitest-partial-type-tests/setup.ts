import 'expect-http-client-matchers/vitest.d.ts';

import { toBeSuccessful } from 'expect-http-client-matchers';

expect.extend({
  toBeSuccessful,
});
