import { useAuth } from '../../context/AuthContext';
import './BuyerInfoForm.css';

// this is not a form, it is a component that will be used
// inside the checkout form in Checkout.jsx, it will receive the register
// and errors props from react-hook-form
function BuyerInfoForm({ register, errors }) {
  // obtain user initial data from the auth context
  const { loggedUser } = useAuth();
  const name = loggedUser?.username || '';
  const email = loggedUser?.email || '';

  return (
    <div className="buyer-info-form">
      <label className="buyer-info-form__label" htmlFor="name">
        Nombre completo
      </label>
      <input
        className="buyer-info-form__input"
        id="name"
        type="text"
        defaultValue={name}
        {...register('name', {
          required: 'Nombre completo es necesario',
        })}
      />
      {errors.name && (
        <span className="buyer-info-form__error" role="alert">
          {errors.name.message}
        </span>
      )}

      <label className="buyer-info-form__label" htmlFor="email">
        Correo Electrónico
      </label>
      <input
        className="buyer-info-form__input"
        id="email"
        type="email"
        defaultValue={email}
        {...register('email', {
          required: 'Correo electrónico es necesario',
        })}
      />
      {errors.email && (
        <span className="buyer-info-form__error" role="alert">
          {errors.email.message}
        </span>
      )}

      <label className="buyer-info-form__label" htmlFor="address">
        Dirección de envío
      </label>
      <input
        className="buyer-info-form__input"
        id="address"
        type="text"
        placeholder="Calle 123, Ciudad, País"
        {...register('address', {
          required: 'Dirección es necesaria',
        })}
      />
      {errors.address && (
        <span className="buyer-info-form__error" role="alert">
          {errors.address.message}
        </span>
      )}

      <label className="buyer-info-form__label" htmlFor="phone">
        Teléfono
      </label>
      <input
        className="buyer-info-form__input"
        id="phone"
        type="tel"
        placeholder="+506 1234 - 7890"
        {...register('phone', {
          required: 'Teléfono es necesario',
        })}
      />
      {errors.phone && (
        <span className="buyer-info-form__error" role="alert">
          {errors.phone.message}
        </span>
      )}
    </div>
  );
}

export default BuyerInfoForm;
