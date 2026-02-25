/*const pokemonPromiseOne = new Promise((resolve, reject) => {
  fetch("https://pokeapi.co/api/v2/pokemon/23")
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const pokemonPromiseTwo = new Promise((resolve, reject) => {
  fetch("https://pokeapi.co/api/v2/pokemon/25")
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const pokemonPromiseThree = new Promise((resolve, reject) => {
  fetch("https://pokeapi.co/api/v2/pokemon/27")
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

Promise.all([pokemonPromiseOne, pokemonPromiseTwo, pokemonPromiseThree])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.log("Error accessing data", error.message);
  });*/

/*  First I made the version above works good, but fetch already returns a promise, 
so is not necessary to create a new Promise, version below is clean and not redundant*/

const pokemonPromiseOne = fetch("https://pokeapi.co/api/v2/pokemon/23").then(
  (response) => response.json(),
);
const pokemonPromiseTwo = fetch("https://pokeapi.co/api/v2/pokemon/25").then(
  (response) => response.json(),
);
const pokemonPromiseThree = fetch("https://pokeapi.co/api/v2/pokemon/27").then(
  (response) => response.json(),
);

Promise.all([pokemonPromiseOne, pokemonPromiseTwo, pokemonPromiseThree])
  .then((values) => console.log(values))
  .catch((error) => console.error("Error accessing data", error.message));
