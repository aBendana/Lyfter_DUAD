import { useProducts } from '../../context/ProductsContext';
import { useRequireAdmin } from '../../hooks/useRequireAdmin';
import { useAuth } from '../../context/AuthContext';
import { CreateProductForm } from '../../components/Forms';
import { useEditProduct } from '../../hooks/useEditProduct';
import { useCreateProduct } from '../../hooks/useCreateProduct';
import { useDeleteProduct } from '../../hooks/useDeleteProduct';
import './Admin.css';

function Administration({ setCurrentPage, setSelectedProductId }) {
  const { products } = useProducts();
  const { loggedUser } = useAuth();
  const isAdmin = loggedUser?.role === 'administrator';

  // if the user is not an administrator, and try to access the admin page by link,
  // gonna be redirected to home, the hook useRequireAdmin handles this.
  // The null return is to avoid rendering the admin panel for non-admin users, even for a brief moment
  // This is one of two ways to deny access to the admin page the other one is applied in the Header component
  useRequireAdmin(isAdmin, setCurrentPage);
  if (!isAdmin) {
    return null;
  }

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

      {!hasProducts ? (
        /* show a message when there are no products in the catalog */
        <h1 className="products-admin__title-no-products">
          No hay productos para gestionar
        </h1>
      ) : (
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
      )}

      <section className="panel-admin__form">
        <h2 className="panel-admin__form-title">Agregar nuevo producto</h2>
        <CreateProductForm onSubmit={handleCreateProduct} />
      </section>
    </main>
  );
}

export default Administration;
