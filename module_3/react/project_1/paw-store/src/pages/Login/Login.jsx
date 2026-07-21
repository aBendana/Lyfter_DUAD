import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import './Login.css';

function Login({ setCurrentPage }) {
  const { login } = useAuth();
  const [showLoginError, setShowLoginError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle login form submission
  const handleLogin = async (formData) => {
    setIsSubmitting(true);
    setShowLoginError(false);

    try {
      const loginData = await login(formData.email, formData.password);

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
        {showLoginError && 'Credenciales incorrectas, intente nuevamente.'}
      </p>
      <LoginForm
        onSubmit={handleLogin}
        isSubmitting={isSubmitting}
        onCancel={() => setCurrentPage('home')}
        onRegister={() => setCurrentPage('register')}
        loginError={showLoginError}
      />
    </main>
  );
}

export default Login;
