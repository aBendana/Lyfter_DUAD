const carsArray = [
  "Aston Martin",
  "Maserati",
  "Lamborghini",
  "Bentley",
  "McLaren",
  "Lexus",
  "Rolls Royce",
  "Audi",
  "BMW",
];

// iterating with for
for (const car of carsArray) {
  console.log(car);
}

// iterating with forEach version 1 (regular function)
function printCars(car) {
  console.log(car);
}
carsArray.forEach(printCars);

// iteratin with forEach version 2 (arrow function)
carsArray.forEach((car) => {
  console.log(car);
});
