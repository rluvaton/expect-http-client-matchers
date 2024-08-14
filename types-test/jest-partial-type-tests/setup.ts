import 'expect-axios-matchers/jest.d.ts';

import { toBeSuccessful } from 'expect-axios-matchers';

expect.extend({
  toBeSuccessful,
});
