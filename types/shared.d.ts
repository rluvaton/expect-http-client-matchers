export interface CustomMatchers<R> extends Record<string, any> {
  toBeSuccessful(): R;

  toHave2xxStatus(): R;
}

// noinspection JSUnusedGlobalSymbols
export interface SharedMatchers<R> {
  toBeSuccessful(): R;

  toHave2xxStatus(): R;
}
