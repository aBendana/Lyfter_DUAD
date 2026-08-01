import ProductForm from '../ProductForm/ProductForm';
import { useProducts } from '../../../context/ProductsContext';

function EditProductForm({ initialValues, onSubmit, onCancel }) {
  const { updateProductError } = useProducts();

  return (
    <ProductForm
      initialValues={initialValues}
      onCancel={onCancel}
      submitLabel="Guardar cambios"
      genericErrorMessage="Por favor completa todos los campos antes de guardar los cambios."
      successMessage="Cambios guardados con exito."
      requestErrorMessage={updateProductError}
      showCancelButton={true}
      onSubmit={onSubmit}
    />
  );
}

export default EditProductForm;
