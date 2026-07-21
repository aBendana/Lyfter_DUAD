import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import RegisterForm from '../../components/Forms/RegisterForm/RegisterForm';
import './Register.css';

function Register({ setCurrentPage }) {
  const { register } = useAuth();
  const [showRegisterError, setShowRegisterError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle register form submission
  const handleRegister = async (formData) => {
    setIsSubmitting(true);
    setShowRegisterError(false);

    try {
      const registerData = await register(
        formData.username,
        formData.email,
        formData.password,
        formData.role
      );

      setCurrentPage('products');
    } catch (error) {
      setShowRegisterError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="register">
      <h1 className="register__title">Registrarse</h1>
      <p className="register__error">
        {showRegisterError && 'Error al registrarse'}
      </p>
      <RegisterForm
        onSubmit={handleRegister}
        isSubmitting={isSubmitting}
        onCancel={() => setCurrentPage('home')}
      />
    </main>
  );
}

export default Register;
