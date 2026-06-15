import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Products from './pages/Products';
import Loading from './components/Loading';
import ProductDetails from './pages/ProductDetails';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (currentPage !== 'products') {
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300); // simulate the loading time for products page

    return () => clearTimeout(timer);
  }, [currentPage]);

  const renderPage = () => {
    // render products page
    if (currentPage === 'products') {
      if (loading) {
        return <Loading />;
      }

      return (
        <Products
          setCurrentPage={setCurrentPage}
          setSelectedProduct={setSelectedProduct}
        />
      );
    }

    // render product details page
    if (currentPage === 'product-details') {
      return (
        <ProductDetails
          product={selectedProduct}
          setCurrentPage={setCurrentPage}
        />
      );
    }

    {
      /* send to home any other link for now, since contact page 
      is not implemented yet */
    }
    return <Home setCurrentPage={setCurrentPage} />; // render default home page
  };

  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </>
  );
}

export default App;
