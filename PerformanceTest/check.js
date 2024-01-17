import { check } from "k6";
import http from "k6/http";

export const options = {
    vus: 20,
    duration: "20s",
    ext: {
        loadimpact: {
          // Project: Cloud test
          projectID: 3677240,
          // Test runs with the same name groups test runs together.
          name: 'Test check'
        }
    },
    thresholds: {
        http_req_failed: ['rate<0.01'],
        //http_req_duration: ['p(95)<200'],
        http_req_duration: [{
            threshold: "p(95)<400",
            abortonFail: true,
            deleteAbortEval: "10s",
            }],   
    }
  };

export default function(){
    const response = http.get("https://api.escuelajs.co/api/v1/products/4")

    check(response, {
        "statusCode is 200": (r) => r.status === 200,
        "transaction is below 500ms": (r) => r.timings.duration < 500,
        });
}