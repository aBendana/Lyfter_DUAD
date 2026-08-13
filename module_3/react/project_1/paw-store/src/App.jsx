import Header from './components/Header';
import Footer from './components/Footer';
import { ProductsProvider } from './context/ProductsContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { CheckoutProvider } from './context/CheckoutContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <CheckoutProvider>
              <Header />
              <AppRoutes />
              <Footer />
            </CheckoutProvider>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
