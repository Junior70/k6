import http from "k6/http";
import { Gauge, Rate } from "k6/metrics";

export const options = {
  vus: 100,
  duration: "30s",
};

const myRate = new Rate("called_products")

export default function () {
  /*const request = http.get("https://api.escuelajs.co/api/v1/products/2");
  myRate.add(1);
  myRate.add(3);

  const request404 = http.get("https://api.escuelajs.co/api/v1/products/300");
  if(request404.status===400){
    myRate.add(0);
  }*/

  const randomProduct = random(1, 300);// Return random value between 1 and 300
  //const request = http.get("https://api.escuelajs.co/api/v1/products/" + String(randomProduct));
  const request = http.get(`https://api.escuelajs.co/api/v1/products/${randomProduct}`);

  myRate.add(request.status === 200 ? 1 : 0);
}


function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }