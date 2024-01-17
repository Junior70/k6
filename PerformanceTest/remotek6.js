import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  ext: {
    loadimpact: {
      // Project: Cloud test
      projectID: 3677240,
      // Test runs with the same name groups test runs together.
      name: 'Test (11/01/2024-16:41:28)'
    }
  }
};

export default function() {
  http.get('http://test.k6.io');
  sleep(1);
}