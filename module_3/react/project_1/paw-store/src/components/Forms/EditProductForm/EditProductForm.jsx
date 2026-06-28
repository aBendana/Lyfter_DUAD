import ProductForm from '../ProductForm/ProductForm';

function EditProductForm({ initialValues, onSubmit, onCancel }) {
  return (
    <ProductForm
      initialValues={initialValues}
      onCancel={onCancel}
      submitLabel="Guardar cambios"
      genericErrorMessage="Por favor completa todos los campos antes de guardar los cambios."
      successMessage="Cambios guardados con exito."
      showCancelButton={true}
      onSubmit={onSubmit}
    />
  );
}

export default EditProductForm;
