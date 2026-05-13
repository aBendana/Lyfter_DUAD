export function getCategoryImage(category) {
  let path;
  switch (category) {
    case "Dog":
      path = "../assets/images/products-dog.png";
      break;
    case "Cat":
      path = "../assets/images/products-cat.png";
      break;
    case "Fish":
      path = "../assets/images/products-fish.png";
      break;
    case "Bird":
      path = "../assets/images/products-bird.png";
      break;
    case "Reptile":
      path = "../assets/images/products-reptile.png";
      break;
    case "Rodent":
      path = "../assets/images/products-rodent.png";
      break;
    case "Small Mammal":
      path = "../assets/images/products-small-mammal.png";
      break;
    default:
      path = "../assets/images/logo.png";
  }
  return path;
}
