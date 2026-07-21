import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import './LoginForm.css';

function LoginForm({ onSubmit, onCancel, onRegister, loginError }) {
  const initialValues = {
    email: '',
    password: '',
  };

  // useForm hook to manage form state and validation
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  // clear only the password when login fails
  useEffect(() => {
    if (loginError) {
      resetField('password');
    }
  }, [loginError, resetField]);

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <label className="login-form__label" htmlFor="email">
        Email
      </label>
      <input
        className="login-form__input"
        id="email"
        type="email"
        placeholder="Ingrese su email"
        {...register('email', { required: 'Email es necesario' })}
      />
      {errors.email && <span role="alert">{errors.email.message}</span>}

      <label className="login-form__label" htmlFor="password">
        Password
      </label>
      <input
        className="login-form__input"
        id="password"
        type="password"
        placeholder="Ingrese su password"
        {...register('password', { required: 'Password es necesario' })}
      />
      {errors.password && <span role="alert">{errors.password.message}</span>}

      <div className="login-form__buttons">
        <button className="login-form__button" type="submit">
          Iniciar Sesión
        </button>

        <button className="login-form__button" type="button" onClick={onCancel}>
          Volver al inicio
        </button>

        <button
          className="login-form__button"
          type="button"
          onClick={onRegister}
        >
          Registrarse
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
