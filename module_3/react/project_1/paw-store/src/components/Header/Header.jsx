import React from 'react';
import pawPrint from '../../assets/icons/PawPrint.svg';
import './Header.css';

function Header({ currentPage, setCurrentPage }) {
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
          className={currentPage === 'home' ? 'active' : 'begin'}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
          }}
        >
          Inicio
        </a>

        <a
          href="#"
          className={currentPage === 'products' ? 'active' : 'products-header'}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('products');
          }}
        >
          Productos
        </a>

        <a
          href="#"
          className={currentPage === 'contact' ? 'active' : 'contact'}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('contact');
          }}
        >
          Contacto
        </a>

        <a
          href="#"
          className={currentPage === 'admin' ? 'active' : 'admin'}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('admin');
          }}
        >
          Administración
        </a>
      </nav>
    </header>
  );
}

export default Header;
