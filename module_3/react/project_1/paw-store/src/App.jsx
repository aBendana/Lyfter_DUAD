import { useState } from 'react';
import Home from './pages/Home';
import Products from './pages/Products';
import { useLoadingEffect } from './hooks/useLoadingEffect';
import ProductDetails from './pages/ProductDetails';
import Administration from './pages/Admin';
import EditProduct from './pages/EditProduct';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { ProductsProvider } from './context/ProductsContext';
import { AuthProvider } from './context/AuthContext';
import { useExistsCurrentPage } from './hooks/useExistsCurrentPage';

function App() {
  // state to manage the current page view
  const [currentPage, setCurrentPage] = useState('home');

  // custom hook to ensure the current page is valid and exists
  const safeSetCurrentPage = useExistsCurrentPage(setCurrentPage);

  // state to manage the selected product for details view
  const [selectedProductDetailsId, setSelectedProductDetailsId] =
    useState(null);

  // state to manage the selected product for edit view
  const [selectedProductId, setSelectedProductId] = useState(null);

  // define the loading effect hook - loading screen
  const isLoading = useLoadingEffect(currentPage);

  const renderPage = () => {
    // render login page
    if (currentPage === 'login') {
      return <Login setCurrentPage={setCurrentPage} />;
    }

    // render register page
    if (currentPage === 'register') {
      return <Register setCurrentPage={setCurrentPage} />;
    }

    // render products page
    if (currentPage === 'products') {
      if (isLoading) {
        return <Loading />;
      }

      return (
        <Products
          setCurrentPage={setCurrentPage}
          setSelectedProductDetailsId={setSelectedProductDetailsId}
        />
      );
    }

    // render product details page
    if (currentPage === 'product-details') {
      return (
        <ProductDetails
          productId={selectedProductDetailsId}
          setCurrentPage={setCurrentPage}
        />
      );
    }

    // render administration page
    if (currentPage === 'admin') {
      if (isLoading) {
        return <Loading />;
      }

      return (
        <Administration
          setCurrentPage={setCurrentPage}
          setSelectedProductId={setSelectedProductId}
        />
      );
    }

    // render edit product page
    if (currentPage === 'edit-product') {
      return (
        <EditProduct
          productId={selectedProductId}
          setCurrentPage={setCurrentPage}
          setSelectedProductId={setSelectedProductId}
        />
      );
    }

    /* send to home any other link, right now is not used because 
    of the useExistsCurrentPage hook, this can be quite  useful 
    for future implementations of 404 pages or other error handling. 
    General fallback for security */
    return <Home setCurrentPage={setCurrentPage} />; // render default home page
  };

  return (
    <AuthProvider>
      <ProductsProvider>
        <Header currentPage={currentPage} setCurrentPage={safeSetCurrentPage} />
        {renderPage()}
        <Footer />
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
