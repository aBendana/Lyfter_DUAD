import { useProducts } from '../../context/ProductsContext';
import { useRequireAdmin } from '../../hooks/useRequireAdmin';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { EditProductForm } from '../../components/Forms';
import './EditProduct.css';

function EditProduct({ productId, setCurrentPage, setSelectedProductId }) {
  const { products, updateProduct } = useProducts();
  const productToEdit = products.find((product) => product.id === productId);

  // this is a guard to prevent non-admin users
  // check if the logged user is an administrator to render the edit product page,
  // if not redirect to home, as same as was did in the Admin.jsx page
  const { loggedUser } = useAuth();
  const isAdmin = loggedUser?.role === 'administrator';
  useRequireAdmin(isAdmin, setCurrentPage);
  if (!isAdmin) {
    return null;
  }

  // handle the cancel and back to admin panel
  const cancelEdit = () => {
    setCurrentPage('admin');
    setSelectedProductId(null);
  };

  // guard in case the product is not found in the catalog
  // redirect to admin if the product doesn't exist
  useEffect(() => {
    if (!productToEdit) {
      const timer = setTimeout(() => {
        cancelEdit();
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [productToEdit]);

  // show a message before redirecting,
  // has a 1.8 seconds delay before redirecting to the admin panel
  if (!productToEdit) {
    return (
      <main className="edit-product">
        <h2 className="edit-product__title">
          No se encontró el producto para editar.
        </h2>
      </main>
    );
  }

  // setup initial values for the form based on the product to edit
  const productInitialValues = {
    name: productToEdit.nombre,
    description: productToEdit.descripcion,
    price: productToEdit.precio,
    category: productToEdit.categoria,
    imageUrl: productToEdit.imagen,
    stock: productToEdit.stock,
  };

  // manage the submit action for the editing and comeback to admin panel
  const handleEditSubmit = async (formData) => {
    await updateProduct(productId, {
      nombre: formData.name,
      descripcion: formData.description,
      precio: formData.price,
      categoria: formData.category,
      imagen: formData.imageUrl,
      stock: formData.stock,
    });

    cancelEdit(); // go back to the admin panel after editing
  };

  // load the EditProductForm with the initial values
  // and handleEditSubmit function
  return (
    <main className="edit-product">
      <h1 className="edit-product__title">Editar producto</h1>
      <EditProductForm
        initialValues={productInitialValues}
        onCancel={cancelEdit}
        onSubmit={handleEditSubmit}
      />
    </main>
  );
}

export default EditProduct;
