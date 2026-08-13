import { Routes, Route } from 'react-router-dom';
import { ROUTES } from './routes';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Admin from '../pages/Admin';
import EditProduct from '../pages/EditProduct';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Confirmation from '../pages/Confirmation';
import NotFound from '../pages/NotFound';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.PRODUCTS} element={<Products />} />
      <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetails />} />
      {/* "contacto" route to home because there is no dedicated contact page yet */}
      <Route path={ROUTES.CONTACT} element={<Home />} />
      <Route path={ROUTES.ADMIN} element={<Admin />} />
      <Route path={ROUTES.EDIT_PRODUCT} element={<EditProduct />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.CART} element={<Cart />} />
      <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
      <Route path={ROUTES.CONFIRMATION} element={<Confirmation />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}
