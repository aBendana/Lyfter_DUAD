import AccessDenied from '../../components/AccessDenied';
import { useProducts } from '../../context/ProductsContext';
import { useRequireAdmin } from '../../hooks/useRequireAdmin';
import { useAuth } from '../../context/AuthContext';
import { CreateProductForm } from '../../components/Forms';
import { useEditProduct } from '../../hooks/useEditProduct';
import { useCreateProduct } from '../../hooks/useCreateProduct';
import { useDeleteProduct } from '../../hooks/useDeleteProduct';
import './Admin.css';

function Administration({ setCurrentPage, setSelectedProductId }) {
  const { products, loadProductsError, deleteProductError } = useProducts();
  const { loggedUser } = useAuth();
  const isAdmin = loggedUser?.role === 'admin';

  // if the user is not an administrator, and try to access the admin page,
  // gonna be redirected first to a temporary Access Denied page,
  // in Access Denied page, the user will be redirected to home after 7 seconds
  // or can click the button to go to home immediately
  useRequireAdmin(isAdmin, setCurrentPage);
  if (!isAdmin) {
    return <AccessDenied setCurrentPage={setCurrentPage} />;
  }

  // render the admin panel for administrators
  return (
    <AdminPanel
      products={products}
      loadProductsError={loadProductsError}
      deleteProductError={deleteProductError}
      setCurrentPage={setCurrentPage}
      setSelectedProductId={setSelectedProductId}
    />
  );
}

function AdminPanel({
  products,
  loadProductsError,
  deleteProductError,
  setCurrentPage,
  setSelectedProductId,
}) {
  // handle for creating a new product using the custom hook
  const handleCreateProduct = useCreateProduct();

  //handlers for edit and delete product actions using custom hooks
  const handleEditProduct = useEditProduct({
    setCurrentPage,
    setSelectedProductId,
  });
  const handleDeleteProduct = useDeleteProduct();
  const hasProducts = Boolean(products?.length);

  return (
    <main className="panel-admin">
      <h1 className="panel-admin__title">Panel de Administración</h1>
      <p className="panel-admin__description">
        En esta sección puedes gestionar el catálogo de productos de PawStore.
      </p>

      {loadProductsError && (
        /* guard show a message when a loading error occurs,
        the create/update errors are handled separately inside their forms */
        <p className="panel-admin__error-message">{loadProductsError}</p>
      )}

      {deleteProductError && (
        /* guard show a message when a delete error occurs */
        <p className="panel-admin__error-message">{deleteProductError}</p>
      )}

      {!hasProducts && !loadProductsError ? (
        /* show a message when there are no products in the catalog,
        but only if there is no error, to avoid contradictory messages */
        <h1 className="products-admin__title-no-products">
          No hay productos para gestionar
        </h1>
      ) : hasProducts ? (
        /* show the products table when there are products in the catalog */
        <section className="products-admin__table">
          <table className="products-admin__table-content">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.nombre}</td>
                  <td>₡{product.precio.toLocaleString('es-CR')}</td>
                  <td>{product.categoria}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className="product__button--edit"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="product__button--delete"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}

      <section className="panel-admin__form">
        <h2 className="panel-admin__form-title">Agregar nuevo producto</h2>
        <CreateProductForm onSubmit={handleCreateProduct} />
      </section>
    </main>
  );
}

export default Administration;
