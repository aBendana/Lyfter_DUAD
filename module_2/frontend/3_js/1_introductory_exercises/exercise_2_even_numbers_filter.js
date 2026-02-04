const myNumbersArray = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

// even numbers with for
function evenNumbersWithFor(arrayWithNumbers) {
  let evenNumbers = [];
  for (const number of arrayWithNumbers) {
    if (number % 2 === 0) {
      evenNumbers.push(number);
    }
  }
  console.log(evenNumbers);
}

// even numbers with filter
function evenNumberWithFilter(arrayWithNumbers) {
  const evenNumbersFiltered = arrayWithNumbers.filter(
    (number) => number % 2 === 0,
  );
  console.log(evenNumbersFiltered);
}

evenNumbersWithFor(myNumbersArray);
console.log("----------------------");
evenNumberWithFilter(myNumbersArray);
