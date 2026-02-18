function isEven() {
  console.log("The number is even");
}

function isOdd() {
  console.log("The number is odd");
}

function checkEvenOrOdd(anyNumber, printEven, printOdd) {
  console.log(`${anyNumber} is a even number or odd number?`);

  if (anyNumber % 2 === 0) {
    printEven();
  } else {
    printOdd();
  }
}

checkEvenOrOdd(500, isEven, isOdd);
checkEvenOrOdd(1001, isEven, isOdd);
checkEvenOrOdd(20, isEven, isOdd);
checkEvenOrOdd(11, isEven, isOdd);
