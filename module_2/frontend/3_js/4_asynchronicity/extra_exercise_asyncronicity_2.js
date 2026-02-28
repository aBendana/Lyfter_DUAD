const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
const scripts = ["script1.js", "script2.js", "script3.js"];
const styles = ["style1.css", "style2.css", "style3.css"];

// loaded in parallel
async function loadImages(images) {
  try {
    const imagesTimed = images.map(
      (image) =>
        new Promise((resolve) => {
          const delay = Math.random() * 1000 + 200;
          setTimeout(() => {
            resolve(image);
            console.log(`Loaded ${image} in ${delay.toFixed(2)}ms`);
          }, delay);
        }),
    );

    const loadedImages = Promise.all(imagesTimed);
    return loadedImages;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// loaded sequentially using await
async function loadScripts(scripts) {
  const loadedScripts = [];

  try {
    for (const script of scripts) {
      const delay = Math.floor(Math.random() * 1000) + 200;
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(script);
          console.log(`Loaded ${script} in ${delay.toFixed(2)}ms`);
        }, delay);
      });
      loadedScripts.push(script);
    }

    return loadedScripts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// loaded sequentially using then()
async function loadStyles(styles) {
  const loadedStyles = [];
  try {
    let styleChainPromises = Promise.resolve();

    styles.forEach((style) => {
      styleChainPromises = styleChainPromises.then(() => {
        const delay = Math.floor(Math.random() * 1000) + 200;

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(style);
            console.log(`Loaded ${style} in ${delay}ms`);
            loadedStyles.push(style);
          }, delay);
        });
      });
    });

    await styleChainPromises;
    return loadedStyles;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// functions inside loadResources works in parallel,
// but each function has it own way to works sequentially or in parallel
// concurrent and sequential at the same time
async function loadResources() {
  try {
    await Promise.all([
      loadImages(images),
      loadScripts(scripts),
      loadStyles(styles),
    ]);
  } catch (error) {
    console.error("Error accessing data", error.message);
  }
  console.log("Site fully loaded!!!");
}

loadResources();

/*Loaded img2.jpg in 231.86ms
Loaded img3.jpg in 457.62ms
Loaded style1.css in 679ms
Loaded img1.jpg in 933.72ms
Loaded script1.js in 1099.00ms
Loaded style2.css in 844ms
Loaded script2.js in 882.00ms
Loaded style3.css in 698ms
Loaded script3.js in 964.00ms
Site fully loaded!!!*/
