<div align="center">
  <h1>Expect HTTP Client Matchers</h1>

Additional expect matchers for http clients (e.g. Axios, got, or custom), supports `jest`, `vitest`, `expect`.

</div>

<hr />

[![version](https://img.shields.io/npm/v/expect-http-client-matchers.svg?style=flat-square)](https://www.npmjs.com/package/expect-http-client-matchers)

- [Why](#why)
- [Installation](#installation)
- [Setup](#setup)
    - [Vanilla `expect`](#vanilla-expect)
      - [Typescript](#typescript)
    - [Vitest](#vitest)
      - [Typescript](#typescript-1)
    - [Jest](#jest)
      - [Typescript](#typescript-2)
- [Asymmetric matchers](#asymmetric-matchers)
- [HTTP Clients](#http-clients)
  - [Axios](#axios)
    - [Setup](#setup-1)
  - [Got](#got)
    - [Setup](#setup-2)
    - [Troubleshooting](#troubleshooting)
      - [Error: _The `searchParameters` option does not exist. Use `searchParams` instead._](#error-_the-searchparameters-option-does-not-exist-use-searchparams-instead_)
  - [Custom HTTP Client](#custom-http-client)
- [Configure](#configure)
- [API](#api)
  - [.toBeSuccessful()](#tobesuccessful)
  - [.toHave2xxStatus()](#tohave2xxstatus)
  - [.toHave3xxStatus()](#tohave3xxstatus) 
  - [.toHave4xxStatus()](#tohave4xxstatus)
  - [.toHave5xxStatus()](#tohave5xxstatus)
  - [.toHaveStatus(`<status code>`)](#tohavestatusstatus-code)
  - [Specific Status](#specific-status)
    - [.toHaveSwitchingProtocolsStatus()](#tohaveswitchingprotocolsstatus)
    - [.toHaveOkStatus()](#tohaveokstatus)
    - [.toHaveCreatedStatus()](#tohavecreatedstatus)
    - [.toHaveAcceptedStatus()](#tohaveacceptedstatus)
    - [.toHaveNonAuthoritativeInformationStatus()](#tohavenonauthoritativeinformationstatus)
    - [.toHaveNoContentStatus()](#tohavenocontentstatus)
    - [.toHaveResetContentStatus()](#tohaveresetcontentstatus)
    - [.toHavePartialContentStatus()](#tohavepartialcontentstatus)
    - [.toHaveMultiStatusStatus()](#tohavemultistatusstatus)
    - [.toHaveMultipleChoicesStatus()](#tohavemultiplechoicesstatus)
    - [.toHaveMovedPermanentlyStatus()](#tohavemovedpermanentlystatus)
    - [.toHaveMovedTemporarilyStatus()](#tohavemovedtemporarilystatus)
    - [.toHaveSeeOtherStatus()](#tohaveseeotherstatus)
    - [.toHaveNotModifiedStatus()](#tohavenotmodifiedstatus)
    - [.toHaveUseProxyStatus()](#tohaveuseproxystatus)
    - [.toHaveTemporaryRedirectStatus()](#tohavetemporaryredirectstatus)
    - [.toHavePermanentRedirectStatus()](#tohavepermanentredirectstatus)
    - [.toHaveBadRequestStatus()](#tohavebadrequeststatus)
    - [.toHaveUnauthorizedStatus()](#tohaveunauthorizedstatus)
    - [.toHavePaymentRequiredStatus()](#tohavepaymentrequiredstatus)
    - [.toHaveForbiddenStatus()](#tohaveforbiddenstatus)
    - [.toHaveNotFoundStatus()](#tohavenotfoundstatus)
    - [.toHaveMethodNotAllowedStatus()](#tohavemethodnotallowedstatus)
    - [.toHaveNotAcceptableStatus()](#tohavenotacceptablestatus)
    - [.toHaveProxyAuthenticationRequiredStatus()](#tohaveproxyauthenticationrequiredstatus)
    - [.toHaveRequestTimeoutStatus()](#tohaverequesttimeoutstatus)
    - [.toHaveConflictStatus()](#tohaveconflictstatus)
    - [.toHaveGoneStatus()](#tohavegonestatus)
    - [.toHaveLengthRequiredStatus()](#tohavelengthrequiredstatus)
    - [.toHavePreconditionFailedStatus()](#tohavepreconditionfailedstatus)
    - [.toHaveRequestTooLongStatus()](#tohaverequesttoolongstatus)
    - [.toHaveRequestUriTooLongStatus()](#tohaverequesturitoolongstatus)
    - [.toHaveUnsupportedMediaTypeStatus()](#tohaveunsupportedmediatypestatus)
    - [.toHaveRequestedRangeNotSatisfiableStatus()](#tohaverequestedrangenotsatisfiablestatus)
    - [.toHaveExpectationFailedStatus()](#tohaveexpectationfailedstatus)
    - [.toHaveImATeapotStatus()](#tohaveimateapotstatus)
    - [.toHaveInsufficientSpaceOnResourceStatus()](#tohaveinsufficientspaceonresourcestatus)
    - [.toHaveMethodFailureStatus()](#tohavemethodfailurestatus)
    - [.toHaveMisdirectedRequestStatus()](#tohavemisdirectedrequeststatus)
    - [.toHaveUnprocessableEntityStatus()](#tohaveunprocessableentitystatus)
    - [.toHaveLockedStatus()](#tohavelockedstatus)
    - [.toHaveFailedDependencyStatus()](#tohavefaileddependencystatus)
    - [.toHaveUpgradeRequiredStatus()](#tohaveupgraderequiredstatus)
    - [.toHavePreconditionRequiredStatus()](#tohavepreconditionrequiredstatus)
    - [.toHaveTooManyRequestsStatus()](#tohavetoomanyrequestsstatus)
    - [.toHaveRequestHeaderFieldsTooLargeStatus()](#tohaverequestheaderfieldstoolargestatus)
    - [.toHaveUnavailableForLegalReasonsStatus()](#tohaveunavailableforlegalreasonsstatus)
    - [.toHaveInternalServerErrorStatus()](#tohaveinternalservererrorstatus)
    - [.toHaveNotImplementedStatus()](#tohavenotimplementedstatus)
    - [.toHaveBadGatewayStatus()](#tohavebadgatewaystatus)
    - [.toHaveServiceUnavailableStatus()](#tohaveserviceunavailablestatus)
    - [.toHaveGatewayTimeoutStatus()](#tohavegatewaytimeoutstatus)
    - [.toHaveHttpVersionNotSupportedStatus()](#tohavehttpversionnotsupportedstatus)
    - [.toHaveInsufficientStorageStatus()](#tohaveinsufficientstoragestatus)
    - [.toHaveNetworkAuthenticationRequiredStatus()](#tohavenetworkauthenticationrequiredstatus)
  - [.toHaveHeader(`<header name>`[, `<header value>`])](#tohaveheaderheader-name-header-value)
  - [.toHaveBodyEquals(`<body>`)](#tohavebodyequalsbody)
  - [.toHaveBodyMatchObject(`<body>`)](#tohavebodymatchobjectbody)


## Why

The problem this library solves is that when you check

```js
const response = await axios.get(); // send request

// If the response status is 400 the test will fail but you wouldn't know what was the response body...
expect(response.status).toEqual(200)
expect(response.data).toEqual({something: 1});
```

If the response status is 400 the test will fail with:

```
expect(received).toEqual(expected) // deep equality

Expected: 200
Received: 400
```

But you don't know what was the response body to debug the issue...

using this package the test will fail with the response body, url, headers and status code so you can debug the issue.


Also, when you just wanna assert that the response was successful, without checking specific status code you can use `expect(response).toBeSuccessful()`
which will check if the status code is between 200 and 299 (inclusive).

this is great when you need to send request to the server as part of your test without it being the main focus of the test

## Installation

With npm:

```sh
npm install --save-dev expect-http-client-matchers
```

With yarn:

```sh
yarn add -D expect-http-client-matchers
```

## Setup

> For all typescript setup you can look at the `types-test` folder to see working examples

### Vanilla `expect`

```javascript
// ./testSetup.js

import {expect} from 'expect';

// add all expect-http-client-matchers matchers
import {matchers} from 'expect-http-client-matchers';
expect.extend(matchers);

// or just add specific matchers
import { matchers } from 'expect-http-client-matchers';
const { toBeSuccessful, toHave2xxStatus } = matchers;
```

#### Typescript

If your editor does not recognise the custom `expect-http-client-matchers` matchers, add to the `setupTests.ts` file

```ts
import 'expect-http-client-matchers/expect.d.ts';
```

### Vitest

```javascript
// ./testSetup.js

// add all expect-http-client-matchers matchers
import { matchers } from 'expect-http-client-matchers';
expect.extend(matchers);

// or just add specific matchers
import { matchers } from 'expect-http-client-matchers';
const { toBeSuccessful, toHave2xxStatus } = matchers;
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
      setupFiles: ["expect-http-client-matchers/all"]
  }
})
```

#### Typescript

If your editor does not recognise the custom `expect-http-client-matchers` matchers, create a `vitest.d.ts` file and add

```ts
import {SharedMatchers} from "expect-http-client-matchers/types/shared";

import 'vitest';

declare module 'vitest' {
    interface Assertion<T = any> extends SharedMatchers<T> {}
    interface AsymmetricMatchersContaining<T = any>
        extends SharedMatchers<T> {}
}
```

and add that file to the `"files"` list inside your `tsconfig.json`

```json
{
  "files": ["vitest.d.ts"]
}
```

### Jest

```javascript
// ./testSetup.js

// add all expect-http-client-matchers matchers
import { matchers } from 'expect-http-client-matchers';
expect.extend(matchers);

// or just add specific matchers
import { matchers } from 'expect-http-client-matchers';
const { toBeSuccessful, toHave2xxStatus } = matchers;
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
  "setupFilesAfterEnv": ["expect-http-client-matchers/all"]
}
```

#### Typescript

If your editor does not recognise the custom `expect-http-client-matchers` matchers, add to the `setupTests.ts` file

```ts
import 'expect-http-client-matchers/jest.d.ts';
```

## Asymmetric matchers

All matchers described in the API are also asymmetrical since [jest version 23](https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing#custom-asymmetric-matchers):

```js
test('passes when using an asymmetrical matcher', () => {
  expect(axiosResponse).toEqual(expect.toBeSuccessful());
});
```

## HTTP Clients

The supported HTTP clients currently are `axios` and `got`.

There are plan to support more clients in the future and user provided clients

For best experience, you should disable throwing on unsuccessful status code,
you should look at the specific client section for more information if it's needed


### Axios

#### Setup

When using `axios` client, you should disable throwing on unsuccessful status code

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

You need to do **one of the following**:
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

### Got

#### Setup

When using `got`, you should disable throwing on unsuccessful status codes as well

At the moment, `got` does not allow globally disabling throwing on unsuccessful status codes, you will need to do it per client/request
```js
import got from 'got';

// Use this client for all requests
const yourClient = got.extend({
  // Don't throw on error
  throwHttpErrors: false,
  
  // I recommend disabling retry on failure as well
  // retry: {
  //   limit: 0
  // }
});
```

#### Troubleshooting

##### Error: _The `searchParameters` option does not exist. Use `searchParams` instead._

This is due to `jest-matcher-utils` bug (which `expect` and we use under the hood) when printing the request it evaluates every property getter
And `got` has a getter for `searchParameters` which throw an error as it's deprecated

See more here: [jest/jest#15280](https://github.com/jestjs/jest/issues/15280)


### Custom HTTP Client

If you are using a custom HTTP client or a client that is not supported, you can register it

You will need to extend the `abstract` `HttpClientAdapter` class and implement the functions below

Notice, the function may be called multiple times.

**Example: Axios adapter**

```js
const { HttpClientAdapter } = require('expect-http-client-matchers');

/**
 * @typedef {import('axios').AxiosResponse} AxiosResponse
 */

class MyHttpClientAdapter extends HttpClientAdapter {
  static name = 'My custom adapter';

  /**
   * @param {CustomResponse} response
   */
  constructor(response) {
    super(response);
  }

  /**
   * Return whether the response can be handled by this adapter (usefull when using multiple http clients)
   * @param {unknown} response
   * @return {'yes' | 'no' | 'maybe'}
   */
  static canHandle(response) {
    if(response.someUniqueIdentifierOnResponse) {
        return 'yes';
    }
    
    return 'no';
  }

  // the request url
  getUrl() {
    return this.response.url;
  }

  // The repsonse status code
  getStatusCode() {
    return this.response.status;
  }

  // The response headers
  getHeaders() {
    return this.response.headers;
  }

  // The response body
  getBody() {
    return this.response.data;
  }
}

```

Then you can register it

```js
import { configure } from 'expect-http-client-matchers';

configure({
  customAdapters: [YourHttpClientAdapter]
})
```

## Configure

you have the `configure` function that you can use to configure the library

```js
import { configure } from 'expect-http-client-matchers';

configure({
  // Add custom adapters
  customAdapters: [],

  // default HTTP adapter to use
  // when using only single client and the library can't determine the matching one
  defaultAdapterName: undefined,
})
```

## API

#### .toBeSuccessful()

same as [`.toHave2xxStatus`](#tohave2xxstatus)

Use `.toBeSuccessful` when checking if response status code is between 200 and 299 (included)

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

Use `.toHave2xxStatus` when checking if response status code is between 200 and 299 (included)

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

Use `.toHave3xxStatus` when checking if response status code is between 300 and 399 (included)

```js
test('passes when response have status code 300', async () => {
    const response = await axios.get('https://httpstat.us/300');
    expect(response).toHave3xxStatus();
});

test('passes when using .not.toHave3xxStatus() for 200', async () => {
    const response = await axios.get('http://example.com');
    expect(response).not.toHave3xxStatus();
});
```

#### .toHave4xxStatus()

Use `.toHave4xxStatus` when checking if response status code is between 400 and 499 (included)

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

#### .toHave5xxStatus()

Use `.toHave5xxStatus` when checking if response status code is between 500 and 599 (included)

```js
test('passes when response have status code 500', async () => {
    const response = await axios.get('https://httpstat.us/500');
    expect(response).toHave5xxStatus();
});

test('passes when using .not.toHave5xxStatus() for 200', async () => {
    const response = await axios.get('http://example.com');
    expect(response).not.toHave5xxStatus();
});
```

#### .toHaveStatus(`<status code>`)

Use `.toHaveStatus` when checking if response has a specific status

```js
test('passes when response matches the expected status code', async () => {
    const response = await axios.get('https://httpstat.us/500');
    expect(response).toHaveStatus(500);
});

test('passes when using .not.toHaveStatus() for 200', async () => {
    const response = await axios.get('http://example.com');
    expect(response).not.toHaveStatus(400);
});
```

<details>
  <summary>
    <h3 style="display: inline">
      Specific Status
    </h3>
  </summary>

These matchers are specific for HTTP status codes.

#### .toHaveSwitchingProtocolsStatus()

Use `.toHaveSwitchingProtocolsStatus` when checking if HTTP response status code is SWITCHING_PROTOCOLS (101)

```js
test('passes when response have status code 101', async () => {
    const response = await axios.get('https://httpstat.us/101');
    expect(response).toHaveSwitchingProtocolsStatus();
});

test('passes when using .not.toHaveSwitchingProtocolsStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveSwitchingProtocolsStatus();
});
```


#### .toHaveOkStatus()

Use `.toHaveOkStatus` when checking if HTTP response status code is OK (200)

```js
test('passes when response have status code 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).toHaveOkStatus();
});

test('passes when using .not.toHaveOkStatus() for 400', async () => {
    const response = await axios.get('https://httpstat.us/400');
    expect(response).not.toHaveOkStatus();
});
```


#### .toHaveCreatedStatus()

Use `.toHaveCreatedStatus` when checking if HTTP response status code is CREATED (201)

```js
test('passes when response have status code 201', async () => {
    const response = await axios.get('https://httpstat.us/201');
    expect(response).toHaveCreatedStatus();
});

test('passes when using .not.toHaveCreatedStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveCreatedStatus();
});
```


#### .toHaveAcceptedStatus()

Use `.toHaveAcceptedStatus` when checking if HTTP response status code is ACCEPTED (202)

```js
test('passes when response have status code 202', async () => {
    const response = await axios.get('https://httpstat.us/202');
    expect(response).toHaveAcceptedStatus();
});

test('passes when using .not.toHaveAcceptedStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveAcceptedStatus();
});
```


#### .toHaveNonAuthoritativeInformationStatus()

Use `.toHaveNonAuthoritativeInformationStatus` when checking if HTTP response status code is NON_AUTHORITATIVE_INFORMATION (203)

```js
test('passes when response have status code 203', async () => {
    const response = await axios.get('https://httpstat.us/203');
    expect(response).toHaveNonAuthoritativeInformationStatus();
});

test('passes when using .not.toHaveNonAuthoritativeInformationStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveNonAuthoritativeInformationStatus();
});
```


#### .toHaveNoContentStatus()

Use `.toHaveNoContentStatus` when checking if HTTP response status code is NO_CONTENT (204)

```js
test('passes when response have status code 204', async () => {
    const response = await axios.get('https://httpstat.us/204');
    expect(response).toHaveNoContentStatus();
});

test('passes when using .not.toHaveNoContentStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveNoContentStatus();
});
```


#### .toHaveResetContentStatus()

Use `.toHaveResetContentStatus` when checking if HTTP response status code is RESET_CONTENT (205)

```js
test('passes when response have status code 205', async () => {
    const response = await axios.get('https://httpstat.us/205');
    expect(response).toHaveResetContentStatus();
});

test('passes when using .not.toHaveResetContentStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveResetContentStatus();
});
```


#### .toHavePartialContentStatus()

Use `.toHavePartialContentStatus` when checking if HTTP response status code is PARTIAL_CONTENT (206)

```js
test('passes when response have status code 206', async () => {
    const response = await axios.get('https://httpstat.us/206');
    expect(response).toHavePartialContentStatus();
});

test('passes when using .not.toHavePartialContentStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHavePartialContentStatus();
});
```


#### .toHaveMultiStatusStatus()

Use `.toHaveMultiStatusStatus` when checking if HTTP response status code is MULTI_STATUS (207)

```js
test('passes when response have status code 207', async () => {
    const response = await axios.get('https://httpstat.us/207');
    expect(response).toHaveMultiStatusStatus();
});

test('passes when using .not.toHaveMultiStatusStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveMultiStatusStatus();
});
```


#### .toHaveMultipleChoicesStatus()

Use `.toHaveMultipleChoicesStatus` when checking if HTTP response status code is MULTIPLE_CHOICES (300)

```js
test('passes when response have status code 300', async () => {
    const response = await axios.get('https://httpstat.us/300');
    expect(response).toHaveMultipleChoicesStatus();
});

test('passes when using .not.toHaveMultipleChoicesStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveMultipleChoicesStatus();
});
```


#### .toHaveMovedPermanentlyStatus()

Use `.toHaveMovedPermanentlyStatus` when checking if HTTP response status code is MOVED_PERMANENTLY (301)

```js
test('passes when response have status code 301', async () => {
    const response = await axios.get('https://httpstat.us/301');
    expect(response).toHaveMovedPermanentlyStatus();
});

test('passes when using .not.toHaveMovedPermanentlyStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveMovedPermanentlyStatus();
});
```


#### .toHaveMovedTemporarilyStatus()

Use `.toHaveMovedTemporarilyStatus` when checking if HTTP response status code is MOVED_TEMPORARILY (302)

```js
test('passes when response have status code 302', async () => {
    const response = await axios.get('https://httpstat.us/302');
    expect(response).toHaveMovedTemporarilyStatus();
});

test('passes when using .not.toHaveMovedTemporarilyStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveMovedTemporarilyStatus();
});
```


#### .toHaveSeeOtherStatus()

Use `.toHaveSeeOtherStatus` when checking if HTTP response status code is SEE_OTHER (303)

```js
test('passes when response have status code 303', async () => {
    const response = await axios.get('https://httpstat.us/303');
    expect(response).toHaveSeeOtherStatus();
});

test('passes when using .not.toHaveSeeOtherStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveSeeOtherStatus();
});
```


#### .toHaveNotModifiedStatus()

Use `.toHaveNotModifiedStatus` when checking if HTTP response status code is NOT_MODIFIED (304)

```js
test('passes when response have status code 304', async () => {
    const response = await axios.get('https://httpstat.us/304');
    expect(response).toHaveNotModifiedStatus();
});

test('passes when using .not.toHaveNotModifiedStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveNotModifiedStatus();
});
```


#### .toHaveUseProxyStatus()

Use `.toHaveUseProxyStatus` when checking if HTTP response status code is USE_PROXY (305)

```js
test('passes when response have status code 305', async () => {
    const response = await axios.get('https://httpstat.us/305');
    expect(response).toHaveUseProxyStatus();
});

test('passes when using .not.toHaveUseProxyStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveUseProxyStatus();
});
```


#### .toHaveTemporaryRedirectStatus()

Use `.toHaveTemporaryRedirectStatus` when checking if HTTP response status code is TEMPORARY_REDIRECT (307)

```js
test('passes when response have status code 307', async () => {
    const response = await axios.get('https://httpstat.us/307');
    expect(response).toHaveTemporaryRedirectStatus();
});

test('passes when using .not.toHaveTemporaryRedirectStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveTemporaryRedirectStatus();
});
```


#### .toHavePermanentRedirectStatus()

Use `.toHavePermanentRedirectStatus` when checking if HTTP response status code is PERMANENT_REDIRECT (308)

```js
test('passes when response have status code 308', async () => {
    const response = await axios.get('https://httpstat.us/308');
    expect(response).toHavePermanentRedirectStatus();
});

test('passes when using .not.toHavePermanentRedirectStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHavePermanentRedirectStatus();
});
```


#### .toHaveBadRequestStatus()

Use `.toHaveBadRequestStatus` when checking if HTTP response status code is BAD_REQUEST (400)

```js
test('passes when response have status code 400', async () => {
    const response = await axios.get('https://httpstat.us/400');
    expect(response).toHaveBadRequestStatus();
});

test('passes when using .not.toHaveBadRequestStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveBadRequestStatus();
});
```


#### .toHaveUnauthorizedStatus()

Use `.toHaveUnauthorizedStatus` when checking if HTTP response status code is UNAUTHORIZED (401)

```js
test('passes when response have status code 401', async () => {
    const response = await axios.get('https://httpstat.us/401');
    expect(response).toHaveUnauthorizedStatus();
});

test('passes when using .not.toHaveUnauthorizedStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveUnauthorizedStatus();
});
```


#### .toHavePaymentRequiredStatus()

Use `.toHavePaymentRequiredStatus` when checking if HTTP response status code is PAYMENT_REQUIRED (402)

```js
test('passes when response have status code 402', async () => {
    const response = await axios.get('https://httpstat.us/402');
    expect(response).toHavePaymentRequiredStatus();
});

test('passes when using .not.toHavePaymentRequiredStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHavePaymentRequiredStatus();
});
```


#### .toHaveForbiddenStatus()

Use `.toHaveForbiddenStatus` when checking if HTTP response status code is FORBIDDEN (403)

```js
test('passes when response have status code 403', async () => {
    const response = await axios.get('https://httpstat.us/403');
    expect(response).toHaveForbiddenStatus();
});

test('passes when using .not.toHaveForbiddenStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveForbiddenStatus();
});
```


#### .toHaveNotFoundStatus()

Use `.toHaveNotFoundStatus` when checking if HTTP response status code is NOT_FOUND (404)

```js
test('passes when response have status code 404', async () => {
    const response = await axios.get('https://httpstat.us/404');
    expect(response).toHaveNotFoundStatus();
});

test('passes when using .not.toHaveNotFoundStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveNotFoundStatus();
});
```


#### .toHaveMethodNotAllowedStatus()

Use `.toHaveMethodNotAllowedStatus` when checking if HTTP response status code is METHOD_NOT_ALLOWED (405)

```js
test('passes when response have status code 405', async () => {
    const response = await axios.get('https://httpstat.us/405');
    expect(response).toHaveMethodNotAllowedStatus();
});

test('passes when using .not.toHaveMethodNotAllowedStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveMethodNotAllowedStatus();
});
```


#### .toHaveNotAcceptableStatus()

Use `.toHaveNotAcceptableStatus` when checking if HTTP response status code is NOT_ACCEPTABLE (406)

```js
test('passes when response have status code 406', async () => {
    const response = await axios.get('https://httpstat.us/406');
    expect(response).toHaveNotAcceptableStatus();
});

test('passes when using .not.toHaveNotAcceptableStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveNotAcceptableStatus();
});
```


#### .toHaveProxyAuthenticationRequiredStatus()

Use `.toHaveProxyAuthenticationRequiredStatus` when checking if HTTP response status code is PROXY_AUTHENTICATION_REQUIRED (407)

```js
test('passes when response have status code 407', async () => {
    const response = await axios.get('https://httpstat.us/407');
    expect(response).toHaveProxyAuthenticationRequiredStatus();
});

test('passes when using .not.toHaveProxyAuthenticationRequiredStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveProxyAuthenticationRequiredStatus();
});
```


#### .toHaveRequestTimeoutStatus()

Use `.toHaveRequestTimeoutStatus` when checking if HTTP response status code is REQUEST_TIMEOUT (408)

```js
test('passes when response have status code 408', async () => {
    const response = await axios.get('https://httpstat.us/408');
    expect(response).toHaveRequestTimeoutStatus();
});

test('passes when using .not.toHaveRequestTimeoutStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveRequestTimeoutStatus();
});
```


#### .toHaveConflictStatus()

Use `.toHaveConflictStatus` when checking if HTTP response status code is CONFLICT (409)

```js
test('passes when response have status code 409', async () => {
    const response = await axios.get('https://httpstat.us/409');
    expect(response).toHaveConflictStatus();
});

test('passes when using .not.toHaveConflictStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveConflictStatus();
});
```


#### .toHaveGoneStatus()

Use `.toHaveGoneStatus` when checking if HTTP response status code is GONE (410)

```js
test('passes when response have status code 410', async () => {
    const response = await axios.get('https://httpstat.us/410');
    expect(response).toHaveGoneStatus();
});

test('passes when using .not.toHaveGoneStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveGoneStatus();
});
```


#### .toHaveLengthRequiredStatus()

Use `.toHaveLengthRequiredStatus` when checking if HTTP response status code is LENGTH_REQUIRED (411)

```js
test('passes when response have status code 411', async () => {
    const response = await axios.get('https://httpstat.us/411');
    expect(response).toHaveLengthRequiredStatus();
});

test('passes when using .not.toHaveLengthRequiredStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveLengthRequiredStatus();
});
```


#### .toHavePreconditionFailedStatus()

Use `.toHavePreconditionFailedStatus` when checking if HTTP response status code is PRECONDITION_FAILED (412)

```js
test('passes when response have status code 412', async () => {
    const response = await axios.get('https://httpstat.us/412');
    expect(response).toHavePreconditionFailedStatus();
});

test('passes when using .not.toHavePreconditionFailedStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHavePreconditionFailedStatus();
});
```


#### .toHaveRequestTooLongStatus()

Use `.toHaveRequestTooLongStatus` when checking if HTTP response status code is REQUEST_TOO_LONG (413)

```js
test('passes when response have status code 413', async () => {
    const response = await axios.get('https://httpstat.us/413');
    expect(response).toHaveRequestTooLongStatus();
});

test('passes when using .not.toHaveRequestTooLongStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveRequestTooLongStatus();
});
```


#### .toHaveRequestUriTooLongStatus()

Use `.toHaveRequestUriTooLongStatus` when checking if HTTP response status code is REQUEST_URI_TOO_LONG (414)

```js
test('passes when response have status code 414', async () => {
    const response = await axios.get('https://httpstat.us/414');
    expect(response).toHaveRequestUriTooLongStatus();
});

test('passes when using .not.toHaveRequestUriTooLongStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveRequestUriTooLongStatus();
});
```


#### .toHaveUnsupportedMediaTypeStatus()

Use `.toHaveUnsupportedMediaTypeStatus` when checking if HTTP response status code is UNSUPPORTED_MEDIA_TYPE (415)

```js
test('passes when response have status code 415', async () => {
    const response = await axios.get('https://httpstat.us/415');
    expect(response).toHaveUnsupportedMediaTypeStatus();
});

test('passes when using .not.toHaveUnsupportedMediaTypeStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveUnsupportedMediaTypeStatus();
});
```


#### .toHaveRequestedRangeNotSatisfiableStatus()

Use `.toHaveRequestedRangeNotSatisfiableStatus` when checking if HTTP response status code is REQUESTED_RANGE_NOT_SATISFIABLE (416)

```js
test('passes when response have status code 416', async () => {
    const response = await axios.get('https://httpstat.us/416');
    expect(response).toHaveRequestedRangeNotSatisfiableStatus();
});

test('passes when using .not.toHaveRequestedRangeNotSatisfiableStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveRequestedRangeNotSatisfiableStatus();
});
```


#### .toHaveExpectationFailedStatus()

Use `.toHaveExpectationFailedStatus` when checking if HTTP response status code is EXPECTATION_FAILED (417)

```js
test('passes when response have status code 417', async () => {
    const response = await axios.get('https://httpstat.us/417');
    expect(response).toHaveExpectationFailedStatus();
});

test('passes when using .not.toHaveExpectationFailedStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveExpectationFailedStatus();
});
```


#### .toHaveImATeapotStatus()

Use `.toHaveImATeapotStatus` when checking if HTTP response status code is IM_A_TEAPOT (418)

```js
test('passes when response have status code 418', async () => {
    const response = await axios.get('https://httpstat.us/418');
    expect(response).toHaveImATeapotStatus();
});

test('passes when using .not.toHaveImATeapotStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveImATeapotStatus();
});
```


#### .toHaveInsufficientSpaceOnResourceStatus()

Use `.toHaveInsufficientSpaceOnResourceStatus` when checking if HTTP response status code is INSUFFICIENT_SPACE_ON_RESOURCE (419)

```js
test('passes when response have status code 419', async () => {
    const response = await axios.get('https://httpstat.us/419');
    expect(response).toHaveInsufficientSpaceOnResourceStatus();
});

test('passes when using .not.toHaveInsufficientSpaceOnResourceStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveInsufficientSpaceOnResourceStatus();
});
```


#### .toHaveMethodFailureStatus()

Use `.toHaveMethodFailureStatus` when checking if HTTP response status code is METHOD_FAILURE (420)

```js
test('passes when response have status code 420', async () => {
    const response = await axios.get('https://httpstat.us/420');
    expect(response).toHaveMethodFailureStatus();
});

test('passes when using .not.toHaveMethodFailureStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveMethodFailureStatus();
});
```


#### .toHaveMisdirectedRequestStatus()

Use `.toHaveMisdirectedRequestStatus` when checking if HTTP response status code is MISDIRECTED_REQUEST (421)

```js
test('passes when response have status code 421', async () => {
    const response = await axios.get('https://httpstat.us/421');
    expect(response).toHaveMisdirectedRequestStatus();
});

test('passes when using .not.toHaveMisdirectedRequestStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveMisdirectedRequestStatus();
});
```


#### .toHaveUnprocessableEntityStatus()

Use `.toHaveUnprocessableEntityStatus` when checking if HTTP response status code is UNPROCESSABLE_ENTITY (422)

```js
test('passes when response have status code 422', async () => {
    const response = await axios.get('https://httpstat.us/422');
    expect(response).toHaveUnprocessableEntityStatus();
});

test('passes when using .not.toHaveUnprocessableEntityStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveUnprocessableEntityStatus();
});
```


#### .toHaveLockedStatus()

Use `.toHaveLockedStatus` when checking if HTTP response status code is LOCKED (423)

```js
test('passes when response have status code 423', async () => {
    const response = await axios.get('https://httpstat.us/423');
    expect(response).toHaveLockedStatus();
});

test('passes when using .not.toHaveLockedStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveLockedStatus();
});
```


#### .toHaveFailedDependencyStatus()

Use `.toHaveFailedDependencyStatus` when checking if HTTP response status code is FAILED_DEPENDENCY (424)

```js
test('passes when response have status code 424', async () => {
    const response = await axios.get('https://httpstat.us/424');
    expect(response).toHaveFailedDependencyStatus();
});

test('passes when using .not.toHaveFailedDependencyStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveFailedDependencyStatus();
});
```


#### .toHaveUpgradeRequiredStatus()

Use `.toHaveUpgradeRequiredStatus` when checking if HTTP response status code is UPGRADE_REQUIRED (426)

```js
test('passes when response have status code 426', async () => {
    const response = await axios.get('https://httpstat.us/426');
    expect(response).toHaveUpgradeRequiredStatus();
});

test('passes when using .not.toHaveUpgradeRequiredStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveUpgradeRequiredStatus();
});
```


#### .toHavePreconditionRequiredStatus()

Use `.toHavePreconditionRequiredStatus` when checking if HTTP response status code is PRECONDITION_REQUIRED (428)

```js
test('passes when response have status code 428', async () => {
    const response = await axios.get('https://httpstat.us/428');
    expect(response).toHavePreconditionRequiredStatus();
});

test('passes when using .not.toHavePreconditionRequiredStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHavePreconditionRequiredStatus();
});
```


#### .toHaveTooManyRequestsStatus()

Use `.toHaveTooManyRequestsStatus` when checking if HTTP response status code is TOO_MANY_REQUESTS (429)

```js
test('passes when response have status code 429', async () => {
    const response = await axios.get('https://httpstat.us/429');
    expect(response).toHaveTooManyRequestsStatus();
});

test('passes when using .not.toHaveTooManyRequestsStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveTooManyRequestsStatus();
});
```


#### .toHaveRequestHeaderFieldsTooLargeStatus()

Use `.toHaveRequestHeaderFieldsTooLargeStatus` when checking if HTTP response status code is REQUEST_HEADER_FIELDS_TOO_LARGE (431)

```js
test('passes when response have status code 431', async () => {
    const response = await axios.get('https://httpstat.us/431');
    expect(response).toHaveRequestHeaderFieldsTooLargeStatus();
});

test('passes when using .not.toHaveRequestHeaderFieldsTooLargeStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveRequestHeaderFieldsTooLargeStatus();
});
```


#### .toHaveUnavailableForLegalReasonsStatus()

Use `.toHaveUnavailableForLegalReasonsStatus` when checking if HTTP response status code is UNAVAILABLE_FOR_LEGAL_REASONS (451)

```js
test('passes when response have status code 451', async () => {
    const response = await axios.get('https://httpstat.us/451');
    expect(response).toHaveUnavailableForLegalReasonsStatus();
});

test('passes when using .not.toHaveUnavailableForLegalReasonsStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveUnavailableForLegalReasonsStatus();
});
```


#### .toHaveInternalServerErrorStatus()

Use `.toHaveInternalServerErrorStatus` when checking if HTTP response status code is INTERNAL_SERVER_ERROR (500)

```js
test('passes when response have status code 500', async () => {
    const response = await axios.get('https://httpstat.us/500');
    expect(response).toHaveInternalServerErrorStatus();
});

test('passes when using .not.toHaveInternalServerErrorStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveInternalServerErrorStatus();
});
```


#### .toHaveNotImplementedStatus()

Use `.toHaveNotImplementedStatus` when checking if HTTP response status code is NOT_IMPLEMENTED (501)

```js
test('passes when response have status code 501', async () => {
    const response = await axios.get('https://httpstat.us/501');
    expect(response).toHaveNotImplementedStatus();
});

test('passes when using .not.toHaveNotImplementedStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveNotImplementedStatus();
});
```


#### .toHaveBadGatewayStatus()

Use `.toHaveBadGatewayStatus` when checking if HTTP response status code is BAD_GATEWAY (502)

```js
test('passes when response have status code 502', async () => {
    const response = await axios.get('https://httpstat.us/502');
    expect(response).toHaveBadGatewayStatus();
});

test('passes when using .not.toHaveBadGatewayStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveBadGatewayStatus();
});
```


#### .toHaveServiceUnavailableStatus()

Use `.toHaveServiceUnavailableStatus` when checking if HTTP response status code is SERVICE_UNAVAILABLE (503)

```js
test('passes when response have status code 503', async () => {
    const response = await axios.get('https://httpstat.us/503');
    expect(response).toHaveServiceUnavailableStatus();
});

test('passes when using .not.toHaveServiceUnavailableStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveServiceUnavailableStatus();
});
```


#### .toHaveGatewayTimeoutStatus()

Use `.toHaveGatewayTimeoutStatus` when checking if HTTP response status code is GATEWAY_TIMEOUT (504)

```js
test('passes when response have status code 504', async () => {
    const response = await axios.get('https://httpstat.us/504');
    expect(response).toHaveGatewayTimeoutStatus();
});

test('passes when using .not.toHaveGatewayTimeoutStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveGatewayTimeoutStatus();
});
```


#### .toHaveHttpVersionNotSupportedStatus()

Use `.toHaveHttpVersionNotSupportedStatus` when checking if HTTP response status code is HTTP_VERSION_NOT_SUPPORTED (505)

```js
test('passes when response have status code 505', async () => {
    const response = await axios.get('https://httpstat.us/505');
    expect(response).toHaveHttpVersionNotSupportedStatus();
});

test('passes when using .not.toHaveHttpVersionNotSupportedStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveHttpVersionNotSupportedStatus();
});
```


#### .toHaveInsufficientStorageStatus()

Use `.toHaveInsufficientStorageStatus` when checking if HTTP response status code is INSUFFICIENT_STORAGE (507)

```js
test('passes when response have status code 507', async () => {
    const response = await axios.get('https://httpstat.us/507');
    expect(response).toHaveInsufficientStorageStatus();
});

test('passes when using .not.toHaveInsufficientStorageStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveInsufficientStorageStatus();
});
```


#### .toHaveNetworkAuthenticationRequiredStatus()

Use `.toHaveNetworkAuthenticationRequiredStatus` when checking if HTTP response status code is NETWORK_AUTHENTICATION_REQUIRED (511)

```js
test('passes when response have status code 511', async () => {
    const response = await axios.get('https://httpstat.us/511');
    expect(response).toHaveNetworkAuthenticationRequiredStatus();
});

test('passes when using .not.toHaveNetworkAuthenticationRequiredStatus() for 200', async () => {
    const response = await axios.get('https://httpstat.us/200');
    expect(response).not.toHaveNetworkAuthenticationRequiredStatus();
});
```

</details>

<br/>

#### .toHaveHeader(`<header name>`[, `<header value>`])

Use `.toHaveHeader` when checking if response has a specific header, optionally with a specific value

header names are case-insensitive

```js
test('passes when response header match the expected header', async () => {
  const response = await axios.get('https://httpstat.us/200');
  expect(response).toHaveHeader('content-type');
});

test('passes when using .toHaveHeader() with expected value', async () => {
  const response = await axios.get('http://example.com');
  expect(response).toHaveHeader('Accept', 'text/html; UTF-8');
});
```

#### .toHaveBodyEquals(`<body>`)

Use `.toHaveBodyEquals` when checking if response body is equal to the expected body

```js
test('passes when response body match the expected body', async () => {
  const response = await axios.get('https://httpstat.us/200');
  expect(response).toHaveBodyEquals('200 OK');
});

test('passes when using .not.toHaveBodyEquals() with different body', async () => {
  const response = await axios.get('https://httpstat.us/200');
  expect(response).not.toHaveBodyEquals('404 NOT FOUND');
});
```

#### .toHaveBodyMatchObject(`<body>`)

Use `.toHaveBodyMatchObject` when checking if response body match to the expected body

The implementation of the matcher is similar to the implementation of [expect's toMatchObject](https://jestjs.io/docs/en/expect#tomatchobjectobject)
except only valid JSON values or asymmetric matchers are supported in the expected body.

`undefined` values in the expected body means that the response body should not contain the key at all (not even with null value)

```js
test('passes when response body match the expected body', async () => {
    const response = await axios.get('https://some-api.com');
    expect(response).toHaveBodyMatchObject({
        name: 'John Doe',
    });
});

test('passes when using .not.toHaveBodyMatchObject() with different body', async () => {
  const response = await axios.get('https://some-api.com');
  expect(response).not.toHaveBodyMatchObject({
    name: 'hello',
  });
});
```


## LICENSE

[MIT](/LICENSE)
