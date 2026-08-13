import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginForm from '../../components/Forms/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const [showLoginError, setShowLoginError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // handle login form submission
  const handleLogin = async (formData) => {
    setIsSubmitting(true);
    setShowLoginError(false);

    try {
      const loginData = await login(formData.email, formData.password);

      // obtain the role from the login response to determine the next page
      const role = loginData?.role;

      if (role === 'admin') {
        navigate(ROUTES.ADMIN);
      } else {
        navigate(ROUTES.PRODUCTS);
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
        {showLoginError &&
          'Las credenciales proporcionadas no son válidas. ' +
            'Por favor verifica tu correo y contraseña.'}
      </p>
      <LoginForm
        onSubmit={handleLogin}
        isSubmitting={isSubmitting}
        onCancel={() => navigate(ROUTES.HOME)}
        onRegister={() => navigate(ROUTES.REGISTER)}
        loginError={showLoginError}
      />
    </main>
  );
}

export default Login;
