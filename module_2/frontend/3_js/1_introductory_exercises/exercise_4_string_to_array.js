const example = "This is a string!";

function stringToArray(phrase) {
  let word = "";
  let wordsArray = [];

  for (let index = 0; index < phrase.length; index++) {
    if (phrase[index] !== " ") {
      word += phrase[index];
    } else {
      wordsArray.push(word);
      word = "";
    }

    if (index + 1 === phrase.length) {
      wordsArray.push(word);
    }
  }

  return wordsArray;
}

const result = stringToArray(example);
console.log(example);
console.log(result);
