function isPositive(number) {
  if (number > 0) {
    console.log(`Valid number: ${number}`);
  }
}

function isNegative(number) {
  if (number <= 0) {
    console.log(`Invalid number: ${number}`);
  }
}

function validateInput(number, validatePositive, validateNegative) {
  console.log(`Validating ${number}...`);
  validatePositive(number);
  validateNegative(number);
}

validateInput(0, isPositive, isNegative);
validateInput(10, isPositive, isNegative);
validateInput(-10, isPositive, isNegative);
