<div align="center">
  <h1>Expect Axios Matchers</h1>

Additional expect matchers for axios, supports `jest`, `vitest`, `expect`.

</div>

<hr />

[![version](https://img.shields.io/npm/v/expect-axios-matchers.svg?style=flat-square)](https://www.npmjs.com/package/expect-axios-matchers)

- [Installation](#installation)
- [Setup](#setup)
    - [Vanilla `expect`](#vanilla-expect)
      - [Typescript](#typescript)
    - [Vitest](#vitest)
      - [Typescript](#typescript-1)
    - [Jest](#jest)
      - [Typescript](#typescript-2)
- [Asymmetric matchers](#asymmetric-matchers)
- [API](#api)
    - [.toBeSuccessful()](#tobesuccessful)
    - [.toHave2xxStatus()](#tohave2xxstatus)
    - [.toHave3xxStatus()](#tohave3xxstatus)
    - [.toHave4xxStatus()](#tohave4xxstatus)

## Installation

With npm:

```sh
npm install --save-dev expect-axios-matchers
```

With yarn:

```sh
yarn add -D expect-axios-matchers
```

## Setup

### Vanilla `expect`

```javascript
// ./testSetup.js

import {expect} from 'expect';

// add all expect-axios-matchers matchers
import * as matchers from 'expect-axios-matchers';
expect.extend(matchers);

// or just add specific matchers
import { toBeSuccessful, toHave2xxStatus } from 'expect-axios-matchers';
expect.extend({ toBeSuccessful, toHave2xxStatus });
```

#### Typescript

If your editor does not recognise the custom `expect-axios-matchers` matchers, add to the `setupTests.ts` file

```ts
import 'expect-axios-matchers/expect.d.ts';
```

### Vitest

```javascript
// ./testSetup.js

// add all expect-axios-matchers matchers
import * as matchers from 'expect-axios-matchers';
expect.extend(matchers);

// or just add specific matchers
import { toBeSuccessful, toHave2xxStatus } from 'expect-axios-matchers';
expect.extend({ toBeSuccessful, toHave2xxStatus });
```

Add your setup script to your Vitest `setupFiles` configuration. [See for help](https://vitest.dev/config/#setupfiles)

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
      // rest of configuration...
      setupFiles: ["./testSetup.js"]
  }
})
```

To automatically extend `expect` with all matchers, you can use

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
      // rest of configuration...
      setupFiles: ["expect-axios-matchers/all"]
  }
})
```

#### Typescript

If your editor does not recognise the custom `expect-axios-matchers` matchers, add to the `setupTests.ts` file

```ts
import 'expect-axios-matchers/vitest.d.ts';
```

### Jest

```javascript
// ./testSetup.js

// add all expect-axios-matchers matchers
import * as matchers from 'expect-axios-matchers';
expect.extend(matchers);

// or just add specific matchers
import { toBeSuccessful, toHave2xxStatus } from 'expect-axios-matchers';
expect.extend({ toBeSuccessful, toHave2xxStatus });
```

Add your setup script to your Jest `setupFilesAfterEnv` configuration. [See for help](https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array)

```json
"jest": {
  "setupFilesAfterEnv": ["./testSetup.js"]
}
```

To automatically extend `expect` with all matchers, you can use

```json
"jest": {
  "setupFilesAfterEnv": ["expect-axios-matchers/all"]
}
```

#### Typescript

If your editor does not recognise the custom `expect-axios-matchers` matchers, add to the `setupTests.ts` file

```ts
import 'expect-axios-matchers/jest.d.ts';
```

## Asymmetric matchers

All matchers described in the API are also asymmetrical since [jest version 23](https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing#custom-asymmetric-matchers):

```js
test('passes when using an asymmetrical matcher', () => {
  expect(axiosResponse).toEqual(expect.toBeSuccessful());
});
```

## Notes

### Axios reject on unsuccessful status code

By default `axios` throws error on error status code, this means that you will need to do the following which is ugly and have many problems:

```js
try {
    const response = await axios.get('http://some-page.com/this-will-return-400');
    expect(true).toBeFalsy();
} catch(error) {
    if(!error?.response) {
        throw error;
    }

    // Never reached as axios throws by default on non-successful status code
    expect(error.response).not.toBeSuccessful();
}

```

If you want to be able to write the test like this:
```js
const response = await axios.get('http://some-page.com/this-will-return-400');

// Never reached as axios throws by default on non-successful status code
expect(response).not.toBeSuccessful();
```

You need to do:
```js
// Don't throw an error on un-successful status code for ALL axios clients
axios.defaults.validateStatus = () => true;

// Create custom axios instance without affecting other axios clients
const instance = axios.create({
    // Don't throw an error on un-successful status code
    validateStatus: () => true
});
```

all the examples assume you have:
```js
// Don't throw an error on un-successful status code for ALL axios clients
axios.defaults.validateStatus = () => true;
```

## API

#### .toBeSuccessful()

same as [`.toHave2xxStatus`](#tohave2xxstatus)

Use `.toBeSuccessful` when checking if Axios response status code is between 200 and 299 (included)

```js
test('passes when response have status code 200', async () => {
    const response = await axios.get('http://example.com');
    expect(response).toBeSuccessful();
});

test('passes when using .not.toBeSuccessful() for 404', async () => {
    const response = await axios.get('https://missing-website.com');
    expect(response).not.toBeSuccessful();
});
```

#### .toHave2xxStatus()

same as [`.toBeSuccessful`](#tobesuccessful)

Use `.toHave2xxStatus` when checking if Axios response status code is between 200 and 299 (included)

```js
test('passes when response have status code 200', async () => {
    const response = await axios.get('http://example.com');
    expect(response).toHave2xxStatus();
});

test('passes when using .not.toHave2xxStatus() for 404', async () => {
    const response = await axios.get('https://missing-website.com');
    expect(response).not.toHave2xxStatus();
});
```

#### .toHave3xxStatus()

Use `.toHave3xxStatus` when checking if Axios response status code is between 300 and 399 (included)

```js
test('passes when response have status code 300', async () => {
    const response = await axios.get('https://httpstat.us/300');
    expect(response).toHave3xxStatus();
});

test('passes when using .not.toHave3xxStatus() for 404', async () => {
    const response = await axios.get('https://missing-website.com');
    expect(response).not.toHave3xxStatus();
});
```

#### .toHave4xxStatus()

Use `.toHave4xxStatus` when checking if Axios response status code is between 400 and 499 (included)

```js
test('passes when response have status code 400', async () => {
    const response = await axios.get('https://httpstat.us/400');
    expect(response).toHave4xxStatus();
});

test('passes when using .not.toHave4xxStatus() for 200', async () => {
    const response = await axios.get('http://example.com');
    expect(response).not.toHave4xxStatus();
});
```



## LICENSE

[MIT](/LICENSE)