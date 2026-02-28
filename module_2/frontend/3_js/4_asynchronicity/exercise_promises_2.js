const pokemonPromiseOne = fetch("https://pokeapi.co/api/v2/pokemon/23").then(
  (response) => response.json(),
);
const pokemonPromiseTwo = fetch("https://pokeapi.co/api/v2/pokemon/25").then(
  (response) => response.json(),
);
const pokemonPromiseThree = fetch("https://pokeapi.co/api/v2/pokemon/27").then(
  (response) => response.json(),
);

const pokemonPromises = [
  pokemonPromiseOne,
  pokemonPromiseTwo,
  pokemonPromiseThree,
];

Promise.any(pokemonPromises)
  .then((values) => console.log(values))
  .catch((error) => console.error("Error accessing data", error.message));

/* returns the first promise that fulfills, in this case pokemonPromiseOne:
  id: 23*/
