import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './ProductForm.css';

function ProductForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel,
  genericErrorMessage,
  successMessage = '',
  showCancelButton = true,
}) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // useForm hook to manage form state and validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  // effect to reset the form when initialValues change
  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  // handle form submission
  const handleFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
      setShowSuccessMessage(true);
      return;
    }

    // fallback behavior if no onSubmit is provided
    alert(JSON.stringify(data));
  };

  return (
    <form className="product-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor="name">Nombre</label>
      <input
        id="name"
        placeholder="Nombre del producto"
        {...register('name', {
          required: genericErrorMessage,
        })}
      />
      {errors.name && <span role="alert">{errors.name.message}</span>}

      <label htmlFor="description">Descripción</label>
      <textarea
        id="description"
        placeholder="Descripción del producto"
        rows={3}
        {...register('description', {
          required: genericErrorMessage,
        })}
      />
      {errors.description && (
        <span role="alert">{errors.description.message}</span>
      )}

      <label htmlFor="price">Precio</label>
      <input
        id="price"
        placeholder="0.00"
        {...register('price', {
          required: genericErrorMessage,
        })}
      />
      {errors.price && <span role="alert">{errors.price.message}</span>}

      <label htmlFor="category">Categoría</label>
      <input
        id="category"
        placeholder="Categoría del producto (ej. Alimento, Juguetes)"
        {...register('category', {
          required: genericErrorMessage,
        })}
      />
      {errors.category && <span role="alert">{errors.category.message}</span>}

      <label htmlFor="imageUrl">URL de la imagen</label>
      <input
        id="imageUrl"
        placeholder="https://via.placeholder.com/600x400"
        {...register('imageUrl', {
          required: genericErrorMessage,
        })}
      />
      {errors.imageUrl && <span role="alert">{errors.imageUrl.message}</span>}

      <label htmlFor="stock">Stock</label>
      <input
        id="stock"
        placeholder="0"
        {...register('stock', {
          required: genericErrorMessage,
        })}
      />
      {errors.stock && <span role="alert">{errors.stock.message}</span>}

      {showSuccessMessage && successMessage ? (
        <p id="success-message" className="product-form__success-message">
          {successMessage}
        </p>
      ) : null}

      <div className="product-form__buttons-container">
        {showCancelButton && (
          <button
            className="product-form__cancel-button"
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
        <button className="product-form__submit-button" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
