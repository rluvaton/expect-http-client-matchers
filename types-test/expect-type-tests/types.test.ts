import axios from 'axios';
import expect from 'expect';

async function run() {
  const req = await axios.get('http://example.com');

  expect(req).toBeTruthy();

  expect(req).toBeSuccessful();
  expect(req).not.toBeSuccessful();

  expect(req).toHave2xxStatus();
  expect(req).not.toHave2xxStatus();
}

run();
