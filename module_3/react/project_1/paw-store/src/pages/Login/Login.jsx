import { useState } from 'react';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import { authService } from '../../services/authService';
import './Login.css';

function Login({ setCurrentPage }) {
  // state to manage the display of login error messages
  const [showLoginError, setShowLoginError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle login form submission
  const handleLogin = async (formData) => {
    setIsSubmitting(true);
    setShowLoginError(false);

    try {
      const loginData = await authService.mockLogin(
        formData.email,
        formData.password
      );

      // obtain the role from the login response to determine the next page
      const role = loginData?.role;

      if (role === 'administrator') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('products');
      }
    } catch (error) {
      setShowLoginError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login">
      <h1 className="login__title">Iniciar Sesión</h1>
      <p className="login__error">
        {showLoginError && 'Error al iniciar sesión'}
      </p>
      <LoginForm
        onSubmit={handleLogin}
        isSubmitting={isSubmitting}
        onCancel={() => setCurrentPage('home')}
      />
    </main>
  );
}

export default Login;
