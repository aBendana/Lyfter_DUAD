import { useForm } from 'react-hook-form';
import { isValidPassword } from '../../../utils/validatePassword';
import './RegisterForm.css';

function RegisterForm({ onSubmit, onCancel }) {
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <label className="register-form__label" htmlFor="username">
        Nombre de usuario
      </label>
      <input
        className="register-form__input"
        id="username"
        type="text"
        placeholder="Dwayne Johnson"
        {...register('username', {
          required: 'Nombre de usuario es necesario',
        })}
      />
      {errors.username && <span role="alert">{errors.username.message}</span>}

      <label className="register-form__label" htmlFor="email">
        Correo electrónico
      </label>
      <input
        className="register-form__input"
        id="email"
        type="email"
        placeholder="dwayne@ejemplo.com"
        {...register('email', { required: 'Correo electrónico es necesario' })}
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}

      <label className="register-form__label" htmlFor="password">
        Contraseña
      </label>
      <input
        className="register-form__input"
        id="password"
        type="password"
        placeholder="8+ caracteres, A-Z, a-z, 0-9 y símbolo"
        {...register('password', {
          required: 'Contraseña es necesaria',
          validate: (value) =>
            isValidPassword(value) ||
            'Debe tener 8-18 caracteres, mayúscula, minúscula, número y símbolo',
        })}
      />
      {errors.password && <span role="alert">{errors.password.message}</span>}

      <label className="register-form__label" htmlFor="confirmPassword">
        Confirmar contraseña
      </label>
      <input
        className="register-form__input"
        id="confirmPassword"
        type="password"
        placeholder="Confirme su contraseña"
        {...register('confirmPassword', {
          required: 'Confirmar contraseña es necesario',
          validate: (value) =>
            value === getValues('password') || 'Las contraseñas no coinciden',
        })}
      />
      {errors.confirmPassword && (
        <span role="alert">{errors.confirmPassword.message}</span>
      )}

      {/*role client is hidden, but is included in the form data for 
      the correct registration of the new client */}
      <input type="hidden" {...register('role')} value="client" />

      <div className="register-form__buttons">
        <button type="submit" className="register-form__button">
          Registrarse
        </button>
        <button
          type="button"
          className="register-form__button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
