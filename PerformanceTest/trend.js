import http from "k6/http";
import { Trend } from "k6/metrics";

export const options = {
  vus: 100,
  duration: "30s",
};

const myTren = new Trend("duration_time");
const mySecondsTren = new Trend("categories_time");


export default function () {
  const request = http.get("https://api.escuelajs.co/api/v1/products"); 
  myTren.add(request.timings.duration);

  const request2 = http.get("https://api.escuelajs.co/api/v1/categories"); 
  myTren.add(request2.timings.duration);

}