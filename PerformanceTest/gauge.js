import http from "k6/http";
import { Gauge } from "k6/metrics";

export const options = {
  vus: 100,
  duration: "30s",
};

const waitingTime = new Gauge("waiting_time");
const waitingTime2 = new Gauge("waiting_time2");
const sendingTime = new Gauge("sending_time");

export default function () {
  const request = http.get("https://api.escuelajs.co/api/v1/products");
  //Se obtine lo tiempos de cada resultado
  waitingTime.add(request.timings.waiting);
  waitingTime.add(request.timings.sending);
  sendingTime.add(request.timings.sending);
  
  waitingTime2.add(request.timings.waiting + request.timings.sending);

}