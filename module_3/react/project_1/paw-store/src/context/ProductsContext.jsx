import { createContext, useContext, useState, useEffect } from 'react';
import { productsService } from '../services/productsService';
import { useLoading } from '../hooks/useLoading';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  // state to manage the products data
  const [products, setProducts] = useState([]);
  //state to manage the error message for the load products operation
  const [loadProductsError, setLoadProductsError] = useState('');
  // state to manage the error message specifically for the create product operation
  const [createProductError, setCreateProductError] = useState('');
  // state to manage the error message specifically for the update product operation
  const [updateProductError, setUpdateProductError] = useState('');
  // state to manage the error message specifically for the delete product operation
  const [deleteProductError, setDeleteProductError] = useState('');

  // define the loading effect hook - loading screen
  const { loading, execute } = useLoading();

  // useEffect to fetch the products data from the API when the component mounts
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // clear any previous error messages
        setLoadProductsError('');

        await execute(async () => {
          const fetchProducts = await productsService.getAllProducts();
          setProducts(fetchProducts);
        });
      } catch (error) {
        setLoadProductsError('No se pudieron cargar los productos.');
      }
    };

    loadProducts();
  }, [execute]);

  // method to get a single product by id from the API
  // this method is a utility function that is ready to be used
  // as required by the project's development
  const getProductById = async (id) => {
    return await productsService.getProductById(id);
  };

  // method to create a new product and update the products state
  const createProduct = async (product) => {
    try {
      // clear any previous error messages
      setCreateProductError('');

      const newProduct = await productsService.createProduct(product);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (error) {
      setCreateProductError('No se pudo crear el producto.');
    }
  };

  // method to update an existing product and update the products state
  const updateProduct = async (id, product) => {
    try {
      // clear any previous error messages
      setUpdateProductError('');

      const updatedProduct = await productsService.updateProduct(id, product);
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === id ? updatedProduct : p))
      );
    } catch (error) {
      setUpdateProductError('No se pudo actualizar el producto.');
    }
  };

  // method to delete a product and update the products state
  const deleteProduct = async (id) => {
    try {
      // clear any previous error messages
      setDeleteProductError('');

      await productsService.deleteProduct(id);
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    } catch (error) {
      setDeleteProductError('No se pudo eliminar el producto.');
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProductsError,
        createProductError,
        updateProductError,
        deleteProductError,
        loading,
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
