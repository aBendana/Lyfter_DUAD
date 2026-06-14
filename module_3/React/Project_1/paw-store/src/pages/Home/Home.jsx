import React from 'react';
import products from '../../data/products.json';
import './Home.css';

function Home({ setCurrentPage }) {
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
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage('products');
        }}
      >
        Ver Productos
      </a>

      <p className="home__description">
        Esta es la página principal de la aplicación. Más adelante aquí se
        podrán mostrar productos destacados.
      </p>
    </main>
  );
}

export default Home;
