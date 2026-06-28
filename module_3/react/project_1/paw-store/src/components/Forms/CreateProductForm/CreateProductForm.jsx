import ProductForm from '../ProductForm/ProductForm';

function CreateProductForm({ onSubmit }) {
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
      showCancelButton={false}
      onSubmit={onSubmit}
    />
  );
}

export default CreateProductForm;
