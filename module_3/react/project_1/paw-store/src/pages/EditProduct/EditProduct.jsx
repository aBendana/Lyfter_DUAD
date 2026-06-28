import { useCatalog } from '../../context/CatalogContext';
import { EditProductForm } from '../../components/Forms';
import './EditProduct.css';

function EditProduct({ productId, setCurrentPage, setSelectedProductId }) {
  const { catalog, setCatalog } = useCatalog();
  const productToEdit = catalog.find((product) => product.id === productId);

  // setup initial values for the form based on the product to edit
  if (productToEdit) {
    const ProductInitialValues = {
      name: productToEdit.nombre,
      description: productToEdit.descripcion,
      price: productToEdit.precio,
      category: productToEdit.categoria,
      imageUrl: productToEdit.imagen,
      stock: productToEdit.stock,
    };

    const handleEditSubmit = (formData) => {
      setCatalog((currentCatalog) =>
        currentCatalog.map((product) =>
          product.id === productId
            ? {
                ...product,
                nombre: formData.name,
                descripcion: formData.description,
                precio: Number(formData.price),
                categoria: formData.category,
                imagen: formData.imageUrl,
                stock: Number(formData.stock),
              }
            : product
        )
      );
    };

    // handle the cancel and back to admin panel
    const cancelEdit = () => {
      setCurrentPage('admin');
      setSelectedProductId(null);
    };

    // load the EditProductForm with the initial values
    // and handleEditSubmit function
    return (
      <main className="edit-product">
        <h1 className="edit-product__title">Editar producto</h1>
        <EditProductForm
          initialValues={ProductInitialValues}
          onCancel={cancelEdit}
          submitLabel="Guardar cambios"
          genericErrorMessage="Por favor completa todos los campos antes de guardar los cambios."
          showCancelButton={true}
          onSubmit={handleEditSubmit}
        />
      </main>
    );

    // error message if the product is not found in the catalog
  } else
    return (
      <main className="edit-product">
        <h2 className="edit-product__title">
          No se encontró el producto para editar.
        </h2>
      </main>
    );
}

export default EditProduct;
