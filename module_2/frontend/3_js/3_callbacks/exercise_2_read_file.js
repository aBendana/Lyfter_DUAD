function readWordsFromFile(file) {
  const fs = require("fs");
  return fs.readFileSync(file, "utf-8").split(/\r?\n/);
}

function secretMessage(file1, file2, reader) {
  const messageWords = [];
  const secretWords1 = reader(file1);
  const secretWords2 = reader(file2);

  secretWords1.forEach((word) => {
    if (secretWords2.includes(word)) {
      messageWords.push(word);
    }
  });

  const message = messageWords.join(" ");
  console.log(`This is the secret message: ${message}`);
}

secretMessage(
  "3_js/3_callbacks/words_1.txt",
  "3_js/3_callbacks/words_2.txt",
  readWordsFromFile,
);
