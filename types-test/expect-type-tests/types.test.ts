import axios from 'axios';
import expect from 'expect';

async function run() {
  const req = await axios.get('http://example.com');

  expect(req).toBeTruthy();

  expect(req).toBeSuccessful();
  expect(req).not.toBeSuccessful();

  expect(req).toHave2xxStatus();
  expect(req).not.toHave2xxStatus();

  expect(req).toHave3xxStatus();
  expect(req).not.toHave3xxStatus();

  expect(req).toHave4xxStatus();
  expect(req).not.toHave4xxStatus();

  expect(req).toHave5xxStatus();
  expect(req).not.toHave5xxStatus();

  expect(req).toHaveStatus(100);
  expect(req).not.toHaveStatus(100);
}

run();
