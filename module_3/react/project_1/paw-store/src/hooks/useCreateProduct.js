import { useProducts } from '../context/ProductsContext';

export function useCreateProduct() {
  const { createProduct } = useProducts();

  const handleCreateSubmit = async (formData) => {
    await createProduct({
      nombre: formData.name,
      descripcion: formData.description,
      precio: formData.price,
      categoria: formData.category,
      imagen: formData.imageUrl,
      stock: formData.stock,
    });
  };

  return handleCreateSubmit;
}
