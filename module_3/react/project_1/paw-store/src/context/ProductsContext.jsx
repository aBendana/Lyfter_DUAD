import { createContext, useContext, useState, useEffect } from 'react';
import { productsService } from '../services/productsService';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  // state to manage the products data
  const [products, setProducts] = useState([]);

  // useEffect to fetch the products data from the API when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      const fetchProducts = await productsService.getAllProducts();

      setProducts(fetchProducts);
    };
    loadProducts();
  }, []);

  // method to get a single product by id from the API
  const getProductById = async (id) => {
    return await productsService.getProductById(id);
  };

  // method to create a new product and update the products state
  const createProduct = async (product) => {
    const newProduct = await productsService.createProduct(product);

    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // method to update an existing product and update the products state
  const updateProduct = async (id, product) => {
    const updatedProduct = await productsService.updateProduct(id, product);

    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === id ? updatedProduct : p))
    );
  };

  // method to delete a product and update the products state
  const deleteProduct = async (id) => {
    await productsService.deleteProduct(id);

    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
