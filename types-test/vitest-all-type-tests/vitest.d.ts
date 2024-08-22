import { SharedMatchers } from 'expect-http-client-matchers/types/shared';

import 'vitest';

declare module 'vitest' {
  interface Assertion<T = any> extends SharedMatchers<T> {}
  interface AsymmetricMatchersContaining<T = any> extends SharedMatchers<T> {}
}
