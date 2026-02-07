const example =
  "This is a test. This test is simple. This test is a crazy test.";

function stringToArray(phrase) {
  let word = "";
  let wordsArray = [];

  for (let index = 0; index < phrase.length; index++) {
    if (phrase[index] !== " " && phrase[index] !== ".") {
      word += phrase[index];
    } else if (word !== "") {
      wordsArray.push(word);
      word = "";
    }

    if (index + 1 === phrase.length && word != "") {
      wordsArray.push(word);
    }
  }
  return wordsArray;
}

// this is my counter of repeated words
function myCounterRepeatWords(wordsList) {
  const words = {};
  for (let mainIndex = 0; mainIndex < wordsList.length; mainIndex++) {
    let counter = 1;
    for (let index = mainIndex + 1; index < wordsList.length; index++) {
      if (wordsList[mainIndex] === wordsList[index]) {
        counter = counter + 1;
        wordsList.splice(index, 1);
      }
    }
    words[wordsList[mainIndex]] = counter;
  }
  console.log(words);
  return words;
}

/* I searched a easier way to do it, found this version.
    New learning in this specific part: (words[word] || 0) + 1 
    Both version works good*/
function internetCounterRepeatWords(wordsList) {
  const words = {};
  wordsList.forEach((word) => {
    words[word] = (words[word] || 0) + 1;
  });
  console.log(words);
  return words;
}

function main(phrase) {
  const wordsList = stringToArray(phrase);
  const result = myCounterRepeatWords(wordsList);
  //const result = internetCounterRepeatWords(wordsList);
  return result;
}

const result = main(example);
console.log(result);
