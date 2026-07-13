import { useCatalog } from '../context/CatalogContext';

/* get the next available ID in the actual catalog */
const getNextId = (products) => {
  /* if the catalog is empty, return ID 1 */
  if (!products || products.length === 0) {
    return 1; // start with ID 1 if the catalog is empty
  }

  // find the maximum ID
  const maxId = products.reduce(
    (max, product) => Math.max(max, Number(product.id) || 0),
    0
  );
  return maxId + 1;
};

export function useCreateProduct() {
  const { setCatalog } = useCatalog();

  const handleCreateSubmit = (formData) => {
    setCatalog((currentCatalog) => [
      ...currentCatalog,
      {
        id: getNextId(currentCatalog),
        nombre: formData.name,
        descripcion: formData.description,
        precio: formData.price,
        categoria: formData.category,
        imagen: formData.imageUrl,
        stock: formData.stock,
      },
    ]);
  };

  return handleCreateSubmit;
}
