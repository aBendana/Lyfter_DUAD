import pawPrint from '../../assets/icons/PawPrint.svg';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

function Header({ currentPage, setCurrentPage }) {
  const { loggedUser, logout } = useAuth();

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
            setCurrentPage('home');
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

        {/* this <a> is redirecting  to home provisionally, when the contact page
            be ready this has to be changed to 'contact'*/}
        {/* is do it in this way to mantain the active green color 
            in the right view */}
        <a
          href="#"
          className={currentPage === 'contact' ? 'active' : 'header__contact'}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
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
                logout();
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
          //as register page does not have a link in the header,
          // so the green highlighted link will not be shown
          // when the user is on the register page
        )}
      </nav>
    </header>
  );
}

export default Header;
