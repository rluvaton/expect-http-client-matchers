import 'expect-axios-matchers/vitest.d.ts';

import { toBeSuccessful } from 'expect-axios-matchers';

expect.extend({
  toBeSuccessful,
});
