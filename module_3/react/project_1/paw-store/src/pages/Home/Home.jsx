import { useNavigate, NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      <h1 className="home__title">Bienvenido a Paw Store</h1>
      <p className="home__description">
        Somos una tienda dedicada a ofrecer productos de calidad para tus
        mascotas. Explora nuestra selección de juguetes, alimentos y accesorios
        para consentir a tu peludo amigo.
      </p>
      <p className="home__description">
        Explora nuestro catálogo para encontrar camas, juguetes, accesorios y
        más.
      </p>

      {/* link to products page */}
      <NavLink to={ROUTES.PRODUCTS}>Ver Productos</NavLink>

      <p className="home__description">
        Esta es la página principal de la aplicación. Más adelante aquí se
        podrán mostrar productos destacados.
      </p>
    </main>
  );
}

export default Home;
