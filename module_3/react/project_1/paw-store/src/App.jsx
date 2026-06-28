import { useState } from 'react';
import Home from './pages/Home';
import Products from './pages/Products';
import { useLoadingEffect } from './hooks/useLoadingEffect';
import ProductDetails from './pages/ProductDetails';
import Administration from './pages/Admin';
import EditProduct from './pages/EditProduct';
import Header from './components/Header';
import Footer from './components/Footer';
import { CatalogProvider } from './context/CatalogContext';

function App() {
  // state to manage the current page view
  const [currentPage, setCurrentPage] = useState('home');
  // state to manage the selected product for details view
  const [selectedProduct, setSelectedProduct] = useState(null);
  // state to manage the selected product for edit view
  const [selectedProductId, setSelectedProductId] = useState(null);
  // define the loading effect hook - loading screen
  const loadingView = useLoadingEffect(currentPage);

  const renderPage = () => {
    // render products page
    if (currentPage === 'products') {
      if (loadingView) {
        return loadingView;
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

    // render administration page
    if (currentPage === 'admin') {
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

    /* send to home any other link for now, since contact page 
      is not implemented yet */
    return <Home setCurrentPage={setCurrentPage} />; // render default home page
  };

  return (
    <CatalogProvider>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer />
    </CatalogProvider>
  );
}

export default App;
