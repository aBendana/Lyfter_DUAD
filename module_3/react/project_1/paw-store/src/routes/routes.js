//this module defines the routes for the application
// useful to simplify the route management and maintainability
// especially when the application grows in size and complexity
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/productos',
  PRODUCT_DETAILS: '/productos/:id',
  CONTACT: '/contacto',
  ADMIN: '/admin',
  EDIT_PRODUCT: '/admin/editar/:id',
  LOGIN: '/login',
  REGISTER: '/registrarse',
  CART: '/carrito',
  CHECKOUT: '/checkout',
  CONFIRMATION: '/confirmacion',
  NOT_FOUND: '*',
};
