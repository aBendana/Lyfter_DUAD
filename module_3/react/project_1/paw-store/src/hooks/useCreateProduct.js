import { useCatalog } from '../context/CatalogContext';

function createProduct() {
  const { setCatalog } = useCatalog();

  const handleCreateSubmit = (formData) => {
    setCatalog((currentCatalog) => [
      ...currentCatalog,
      {
        id: currentCatalog.length + 1,
        nombre: formData.name,
        descripcion: formData.description,
        precio: Number(formData.price),
        categoria: formData.category,
        imagen: formData.imageUrl,
        stock: Number(formData.stock),
      },
    ]);
  };

  return handleCreateSubmit;
}

export default createProduct;
