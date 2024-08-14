/// <reference types="expect-axios-matchers" />

import 'expect-axios-matchers';

import axios from 'axios';

async function run() {
  const req = await axios.get('http://example.com');

  expect(req).toBeSuccessful();
  expect(req).not.toBeSuccessful();

  expect(req).toHave2xxStatus();
  expect(req).not.toHave2xxStatus();
}

run();
