let numbersList = [3, 5, 7, 8, 9, 5, 8, 10, 11, 12, 12, 13, 14, 5, 11];

function eliminateDuplicates(numbers) {
  for (let mainIndex = 0; mainIndex < numbers.length; mainIndex++) {
    for (let index = mainIndex + 1; index < numbers.length; index++) {
      if (numbers[mainIndex] === numbers[index]) {
        numbers.splice(index, 1);
      }
    }
  }
  console.log(numbers);
}

eliminateDuplicates(numbersList);
