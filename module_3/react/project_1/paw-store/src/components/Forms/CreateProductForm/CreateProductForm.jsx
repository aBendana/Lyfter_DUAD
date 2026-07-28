import ProductForm from '../ProductForm/ProductForm';
import { useProducts } from '../../../context/ProductsContext';

function CreateProductForm({ onSubmit }) {
  const { createProductError } = useProducts();

  const defaultInitialValues = {
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stock: '',
  };

  return (
    <ProductForm
      initialValues={defaultInitialValues}
      onCancel={null}
      submitLabel="Agregar producto"
      genericErrorMessage="Por favor completa todos los campos antes de agregar el producto."
      successMessage="Producto creado con exito."
      requestErrorMessage={createProductError}
      showCancelButton={false}
      shouldResetOnSuccess={true}
      onSubmit={onSubmit}
    />
  );
}

export default CreateProductForm;
