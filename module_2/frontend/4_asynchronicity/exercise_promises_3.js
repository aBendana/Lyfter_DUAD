const wordsArray = ["very", "Dogs", "cute", "are"];
const delays = [300, 100, 400, 200];
const result = [];

//

const promisesTimed = wordsArray.map(
  (word, i) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(word);
        result.push(word);
      }, delays[i]);
    }),
);

Promise.all(promisesTimed)
  .then(() => {
    console.log(result.join(" "));
  })
  .catch((error) => console.error(error));
