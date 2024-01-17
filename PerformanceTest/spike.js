import { sleep } from "k6";
import http from "k6/http"

export const options ={
    stages:[
        {  
            duration: '10s',
            target:10
        },{
            duration: '1m',
            target:400
        }
    ],
    /*
    ext: {
        loadimpact: {
          // Project: Cloud test
          projectID: 3677240,
          // Test runs with the same name groups test runs together.
          name: 'Spike Test',
          staticIP: true,
          distribution:{
            distributionLabel1: {
                loadZone: "amazon:us:ashburn"
            },
            distributionLabel1: {
                loadZone: "amazon:ie:dublin"
            },
          }
        }
    }
    */
}
export default function(){
    let response = http.get("https://api.escuelajs.co/api/v1/products");
}