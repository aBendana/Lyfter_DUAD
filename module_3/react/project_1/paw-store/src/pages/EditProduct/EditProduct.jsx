import AccessDenied from '../../components/AccessDenied/AccessDenied';
import Loading from '../../components/Loading';
import { useProducts } from '../../context/ProductsContext';
import { useRequireAdmin } from '../../hooks/useRequireAdmin';
import { useAuth } from '../../context/AuthContext';
import { useCallback, useEffect } from 'react';
import { EditProductForm } from '../../components/Forms';
import { useParams, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './EditProduct.css';

function EditProduct() {
  // this is a guard to prevent non-admin users
  // check if the logged user is an administrator to render the edit product page,
  // if not redirect to home, as same as was did in the Admin.jsx page
  const { loggedUser } = useAuth();
  const isAdmin = loggedUser?.role === 'admin';

  // if the user is not an administrator, and try to access the admin page,
  // gonna be redirected first to a temporary Access Denied page,
  // in Access Denied page, the user will be redirected to home after 7 seconds
  // or can click the button to go to home immediately
  useRequireAdmin(isAdmin);
  if (!isAdmin) {
    return <AccessDenied />;
  }

  return <EditProductContent />;
}

function EditProductContent() {
  // get the product ID from the URL parameters
  const fromParams = useParams();
  const productId = fromParams.id; // get the product ID from the URL parameters

  const { loading, products, updateProduct } = useProducts();
  const productToEdit = products.find((product) => product.id === productId);
  const navigate = useNavigate();

  // this code segment manage the case when the product to edit is not found in the catalog
  // and don't want to redirect to 404 page, instead redirect to admin panel after 2 seconds
  // handle the cancel and back to admin panel
  // memoize the cancelEdit function to avoid unnecessary re-renders
  const cancelEdit = useCallback(() => {
    navigate(ROUTES.ADMIN);
  }, [navigate]);

  // guard in case the product is not found in the catalog
  // redirect to admin if the product doesn't exist
  useEffect(() => {
    if (!loading && !productToEdit) {
      const timer = setTimeout(() => {
        cancelEdit();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loading, productToEdit, cancelEdit]);

  if (loading) {
    return <Loading />;
  }

  // show a message before redirecting,
  // has a 2 seconds delay before redirecting to the admin panel
  if (!productToEdit) {
    return (
      <main className="edit-product">
        <h2 className="edit-product__title">
          No se encontró el producto para editar o No existe.
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
