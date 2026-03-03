function wait(seconds) {
  const myPromise = "This is my promise";
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(myPromise);
        console.log(myPromise, "and has ended in", seconds);
      }, seconds * 1000);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function executePromises() {
  await wait(2);
  await wait(3);
  await wait(1);
}

executePromises();
