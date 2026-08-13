import pawPrint from '../../assets/icons/PawPrint.svg';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

function Header() {
  const { loggedUser, logout } = useAuth();
  const navigate = useNavigate();
  const { cartTotalItems } = useCart();

  return (
    <header className="header">
      {/* div for logo and store name */}
      <div className="header__logo">
        <img src={pawPrint} alt="paw" className="header__icon" />
        <h1 className="store-name">PawStore</h1>
      </div>

      {/* nav for the navigation links */}
      <nav className="header__nav">
        <NavLink
          to={ROUTES.HOME}
          className={({ isActive }) => (isActive ? 'active' : 'header__begin')}
        >
          Inicio
        </NavLink>

        <NavLink
          to={ROUTES.PRODUCTS}
          className={({ isActive }) =>
            isActive ? 'active' : 'header__products'
          }
        >
          Productos
        </NavLink>

        {/* redirecting to home provisionally; update to ROUTES.CONTACT when the contact page is ready; 
            in order to 'Contacto' doesn't appears active, Link is used instead of NavLink, and the
            className is set as header__contact */}
        <Link to={ROUTES.HOME} className={'header__contact'}>
          Contacto
        </Link>

        <NavLink
          to={ROUTES.ADMIN}
          className={({ isActive }) => (isActive ? 'active' : 'header__admin')}
        >
          Administración
        </NavLink>

        <NavLink
          to={ROUTES.CART}
          className={({ isActive }) => (isActive ? 'active' : 'header__cart')}
        >
          <span>Carrito</span>
          <span> </span>
          {cartTotalItems > 0 && (
            <span className="header__cart-badge">({cartTotalItems})</span>
          )}
        </NavLink>

        {loggedUser ? (
          <div className="header__user-info">
            <span className="header__user-name">
              Usuario: {loggedUser?.username}
            </span>
            <button
              className="header__logout-button"
              onClick={() => {
                logout();
                navigate(ROUTES.HOME);
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          // register page has no header link, so no active highlight on that view
          <NavLink
            to={ROUTES.LOGIN}
            className={({ isActive }) =>
              isActive ? 'active' : 'header__login'
            }
          >
            Iniciar Sesión
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
