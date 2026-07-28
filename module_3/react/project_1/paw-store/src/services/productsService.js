import api from './api';

// productService object to handle product-related API calls
export const productsService = {
  // get all products from the API
  async getAllProducts() {
    try {
      const res = await api.get('/products');
      return res.data;
    } catch (err) {
      console.error(
        'Get all products error:',
        err.response?.data?.message || err.message
      );
      throw new Error(err.response?.data?.message || err.message);
    }
  },

  // get a single product by id from the API
  async getProductById(id) {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      console.error(
        'Get product by id error:',
        err.response?.data?.message || err.message
      );
      throw new Error(err.response?.data?.message || err.message);
    }
  },

  // create a new product in the API
  async createProduct(product) {
    try {
      const res = await api.post('/products', product);
      return res.data;
    } catch (err) {
      console.error(
        'Create product error:',
        err.response?.data?.message || err.message
      );
      throw new Error(err.response?.data?.message || err.message);
    }
  },
  // update an existing product in the API
  async updateProduct(id, product) {
    try {
      const res = await api.patch(`/products/${id}`, product);
      return res.data;
    } catch (err) {
      console.error(
        'Update product error:',
        err.response?.data?.message || err.message
      );
      throw new Error(err.response?.data?.message || err.message);
    }
  },

  // delete a product from the API
  async deleteProduct(id) {
    try {
      const res = await api.delete(`/products/${id}`);
      return res.data;
    } catch (err) {
      console.error(
        'Delete product error:',
        err.response?.data?.message || err.message
      );
      throw new Error(err.response?.data?.message || err.message);
    }
  },
};
