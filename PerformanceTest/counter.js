import http from "k6/http"
import { Counter } from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '20s'
}

const productsCounter = new Counter('products_counter');
const categoriesCounter = new Counter('categories_counter');
const userCounter = new Counter("called_users");

export default function(){
    const randomEndpoint = random(0, 2);// Return random value between 0 and 2
    let selectedEndpoint;
    switch(randomEndpoint){
        case 0:
            selectedEndpoint = "products"
            productsCounter.add(1);
            break;
        case 1:
            selectedEndpoint = "categories";
            categoriesCounter.add(1);
            break;
        case 2:
            selectedEndpoint = "users";
            userCounter.add(1);
            break;
    }

    const response = http.get("https://api.escuelajs.co/api/v1/" + selectedEndpoint);

    /*let response = http.get("https://api.escuelajs.co/api/v1/" + selectedEndpoint)
    productsCounter.add(1)

    let categories = http.get("https://api.escuelajs.co/api/v1/categories")
    categoriesCounter.add(1)

    let users = http.get("https://api.escuelajs.co/api/v1/users")*/
}

function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  /*Ejemplo 1 
  import http from 'k6/http';
import { Counter } from 'k6/metrics';

export const options = {
  vus: 10,
  duration: '20s'
}

const productsCallCounter = new Counter('products_call_counter');
const categoriesCallCounter = new Counter('categories_call_counter');
const usersCallCounter = new Counter('users_call_counter');

export default function(){
  const randomEndpoint = random(0, 2);// Return random value between 0 and 2
  let selectedEndpoint;

  switch(randomEndpoint){
    case 0:
      selectedEndpoint = "products"
      productsCallCounter.add(1);
      break;

    case 1:
      selectedEndpoint = "categories";
      categoriesCallCounter.add(1);
      break;

    case 2:
      selectedEndpoint = "users";
      usersCallCounter.add(1);
      break;
  }

  const response = http.get("https://api.escuelajs.co/api/v1/" + selectedEndpoint);
}

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}*/

/*ejemplo 2
import http from "k6/http";
import { Counter } from "k6/metrics";

export const options = {
    vus: 10, 
    duration: "20s"
}

const productsCounter = new Counter("called_products");
const categoriesCounter = new Counter("called_categories");
const userCounter = new Counter("called_users");

export default function(){
    var endPoints =[
        {
            url:"https://api.escuelajs.co/api/v1/products",
            counter:productsCounter
        },
        {
            url:"https://api.escuelajs.co/api/v1/categories",
            counter:categoriesCounter
        },
        {
            url:"https://api.escuelajs.co/api/v1/users",
            counter:userCounter
        }
    ]
    callRandomEndpoint(endPoints);
        
}

function callRandomEndpoint(arr){
    let numeroAleatorioRango = Math.floor(Math.random() * 3);
    let randomEndPoint = arr[numeroAleatorioRango];
    let response = http.get(randomEndPoint.url);
    randomEndPoint.counter.add(1);
}*/

/*Ejemplo 3
// Importar los módulos necesarios de k6
import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check } from 'k6';

// Definir las opciones de configuración para la prueba
export const options = {
  vus: 10, // Número de usuarios virtuales
  duration: '20s' // Duración de la prueba
};

// Definir contadores para cada endpoint
const productsCallCounter = new Counter('products_call_counter');
const categoriesCallCounter = new Counter('categories_call_counter');
const usersCallCounter = new Counter('users_call_counter');

// Función principal de la prueba
export default function testEcommerceAPI() {
  // Seleccionar aleatoriamente un endpoint de la API
  const randomEndpoint = random(0, 2);
  let selectedEndpoint;

  switch (randomEndpoint) {
    // Endpoint "products"
    case 0:
      selectedEndpoint = "products";
      productsCallCounter.add(1);
      break;

    // Endpoint "categories"
    case 1:
      selectedEndpoint = "categories";
      categoriesCallCounter.add(1);
      break;

    // Endpoint "users"
    case 2:
      selectedEndpoint = "users";
      usersCallCounter.add(1);
      break;
  }

  // Enviar una solicitud GET a la API con el endpoint seleccionado
  const response = http.get(`https://api.escuelajs.co/api/v1/${selectedEndpoint}`);
  
  // Verificar la validez de la respuesta
  check(response, {
    "status is 200": (r) => r.status === 200, // Estado 200
    "has expected properties": (r) => r.json().hasOwnProperty("data") // Contiene la propiedad "data"
  });
  
  // Obtener la duración y el tamaño del cuerpo de la respuesta
  const responseBodySize = response.body.length;
  const responseTime = response.timings.duration;
  
  // Imprimir información sobre la respuesta en la consola
  console.log(`Endpoint: ${selectedEndpoint} - Response size: ${responseBodySize} - Response time: ${responseTime}`);
}

// Función auxiliar para generar un número aleatorio en un rango específico
function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}*/

/*Ejemplo 4
import { Counter } from 'k6/metrics';
import http from 'k6/http';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
    stages: [{ duration: '10s', target: 10 }]
};

const endpoints = [
    {
        url: 'https://api.escuelajs.co/api/v1/products',
        counter: new Counter('product calls'),
    },
    {
        url: 'https://api.escuelajs.co/api/v1/categories',
        counter: new Counter('categories calls'),
    },
    {
        url: 'https://api.escuelajs.co/api/v1/users',
        counter: new Counter('users calls'),
    },
]

export default function () {
    const number = randomIntBetween(0, 2);
    const { url, counter } = endpoints[number];

    const res = http.get(url);
    counter.add(1);
}*/

/*Ejemplo 5
import http from "k6/http";
import { Counter } from "k6/metrics";

const apiUrl = "https://api.escuelajs.co/api/v1";

export const options = {
	vus: 10,
	duration: "20s",
};

const productsCounter = new Counter("called_products");
const categoriesCounter = new Counter("called_categories");
const usersCounter = new Counter("users_categories");

export default function () {
	const counters = [
		{ url: `${apiUrl}/products`, counter: productsCounter },
		{ url: `${apiUrl}/categories`, counter: categoriesCounter },
		{ url: `${apiUrl}/users`, counter: usersCounter },
	];

	const { counter, url } = counters[Math.floor(Math.random() * 3)];
	http.get(url);
	counter.add(1);
}*/

/*Ejemplo 6
import http from "k6/http";

const uri = "https://api.escuelajs.co/api/v1";

export const options = {
  vus: 1,
  duration: "10s",
};

export default function () {
  let randomNumber = Math.floor(Math.random() * 3);
  const endPoints = {
    products: `${uri}/proucts`,
    categories: `${uri}/categories`,
    users: `${uri}/users`,
  };
  const endPoint = Object.values(endPoints)[randomNumber];
  console.log(endPoint);

  let response = http.get(endPoint);
}*/

/*ejemplo 7
import http from "k6/http";
import { Counter } from "k6/metrics";

export const options = {
    vus: 10,
    duration: '20s'
}

const categoriesCounter = new Counter("called_products");
const productsCounter = new Counter("counter_products");
const usersCounter = new Counter("users_counter");

export default function(){
    let randomRequest = parseInt(Math.random()*3); 
    if (randomRequest === 0){
        let response = http.get('https://api.escuelajs.co/api/v1/categories');
        categoriesCounter.add(1);
    } else if (randomRequest === 1) {
        let products = http.get('https://api.escuelajs.co/api/v1/products');
        productsCounter.add(1);
    } else {
        let users = http.get('https://api.escuelajs.co/api/v1/users');
        usersCounter.add(1);
    };
};*/