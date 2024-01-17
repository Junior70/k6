import { sleep } from "k6";
import http from "k6/http"

export const options ={
    stages:[
        {  
            duration: '2m',
            target:100
        },{
            duration: '5m',
            target:100
        },{
            duration: '2m',
            target:400
        },{
            duration: '2m',
            target:400
        }
    ],
    ext: {
        loadimpact: {
          projectID: 3677240,
          // Test runs with the same name groups test runs together
          name: "YOUR TEST NAME"
        }
    }
}
export default function(){
    let response = http.get("https://api.escuelajs.co/api/v1/products");
    sleep(1);
}