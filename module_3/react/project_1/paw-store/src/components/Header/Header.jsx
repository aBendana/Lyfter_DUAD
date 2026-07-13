import pawPrint from '../../assets/icons/PawPrint.svg';
import { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import './Header.css';

function Header({ currentPage, setCurrentPage }) {
  // state to manage the logged-in user information
  const [loggedUser, setLoggedUser] = useState(null);

  // useEffect to retrieve the logged-in user information from localStorage
  // re-runs whenever currentPage changes so login/logout updates the display
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setLoggedUser(user);
  }, [currentPage]);

  return (
    <header className="header">
      {/* div for logo and store name */}
      <div className="header__logo">
        <img src={pawPrint} alt="paw" className="header__icon" />
        <h1 className="store-name">PawStore</h1>
      </div>

      {/* nav for the navigation links */}
      <nav className="header__nav">
        <a
          href="#"
          className={currentPage === 'home' ? 'active' : 'header__begin'}
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          Inicio
        </a>

        <a
          href="#"
          className={
            currentPage === 'products' ? 'active' : 'header__products-header'
          }
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('products');
          }}
        >
          Productos
        </a>

        <a
          href="#"
          className={currentPage === 'contact' ? 'active' : 'header__contact'}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('contact');
          }}
        >
          Contacto
        </a>

        <a
          href="#"
          className={currentPage === 'admin' ? 'active' : 'header__admin'}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('admin');
          }}
        >
          Administración
        </a>

        {loggedUser ? (
          <div className="header__user-info">
            <span className="header__user-name">
              Usuario: {loggedUser?.username}
            </span>
            <button
              className="header__logout-button"
              onClick={(e) => {
                e.preventDefault();
                authService.logout();
                setCurrentPage('home');
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <a
            href="#"
            className={currentPage === 'login' ? 'active' : 'header__login'}
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage('login');
            }}
          >
            Iniciar Sesión
          </a>
        )}
      </nav>
    </header>
  );
}

export default Header;
