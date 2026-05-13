// get all products without pagination
export async function getProducts() {
  const url = "http://127.0.0.1:5000/products";

  try {
    const response = await axios.get(url);
    const productsJson = response.data;

    // verify that the response is an array of products
    if (!Array.isArray(productsJson)) {
      throw new Error("Expected an array of products");
    } else {
      console.log(
        `This is an array and received ${productsJson.length} products.`,
      );
    }
    return productsJson;
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error("Products fetch failed:", apiMessage, error?.response?.data);
    throw new Error(apiMessage);
  }
}

// get products by page number according to the backend pagination
export async function getProductsByPages(page) {
  const url = `http://127.0.0.1:5000/products?page=${page}`;

  try {
    const response = await axios.get(url);
    const productsJson = response.data;

    // verify that the response is an array of products
    if (!Array.isArray(productsJson)) {
      throw new Error("Expected an array of products");
    } else {
      console.log(
        `This is an array and received ${productsJson.length} products.`,
      );
    }
    return productsJson;
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error("Products fetch failed:", apiMessage, error?.response?.data);
    throw new Error(apiMessage);
  }
}

// get product by target species, for example: dog, cat, bird, etc.
export async function getProductsBySpecies(species) {
  const url = `http://127.0.0.1:5000/products?target_species=${species}`;

  try {
    const response = await axios.get(url);
    const productsJson = response.data;

    // verify that the response is an array of products
    if (!Array.isArray(productsJson)) {
      throw new Error("Expected an array of products");
    } else {
      console.log(
        `This is an array and received ${productsJson.length} products.`,
      );
    }
    return productsJson;
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error("Products fetch failed:", apiMessage, error?.response?.data);
    throw new Error(apiMessage);
  }
}

// this function search by name and accept a partial search where the
// search term is part of th product name, so in one search you can get
// multiple products that match the search term
export async function getProductsBySearch(searchTerm) {
  const url = `http://127.0.0.1:5000/products/search?value=${searchTerm}`;

  try {
    const response = await axios.get(url);
    const searchedProductsJson = response.data;

    // verify that the response is an array of products
    if (!Array.isArray(searchedProductsJson)) {
      throw new Error("Expected an array of products");
    } else {
      console.log(
        `This is an array and received ${searchedProductsJson.length} products.`,
      );
    }
    return searchedProductsJson;
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error("Products fetch failed:", apiMessage, error?.response?.data);
    throw new Error(apiMessage);
  }
}

// search by product id for get product details
export async function getProductById(productId) {
  const url = `http://127.0.0.1:5000/products?id=${productId}`;

  try {
    const response = await axios.get(url);
    const productJson = response.data;
    console.log("Received product details:", productJson);

    // api returns an array product info is the 1st and only item
    return productJson[0];
  } catch (error) {
    // errors from API and errors from network
    const apiMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error.message;
    console.error("Products fetch failed:", apiMessage, error?.response?.data);
    throw new Error(apiMessage);
  }
}
