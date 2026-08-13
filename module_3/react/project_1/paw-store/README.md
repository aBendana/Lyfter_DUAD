# Paw Store

Paw Store is a frontend application built with React + Vite for a pet products e-commerce experience.

The project includes mock authentication, user registration, a product catalog, product details, shopping cart, checkout flow, order confirmation, and an admin panel with CRUD operations connected to JSON Server.

## Stack

- React 19
- Vite 8
- JavaScript (ESM)
- CSS
- Axios
- react-hook-form
- react-router-dom
- ESLint + Prettier
- JSON Server (development environment)

## Requirements

- Node.js 18+
- npm 9+

## Installation

1. Clone the repository:

```bash
git clone https://github.com/aBendana/Lyfter_DUAD
```

2. Enter the project directory:

```bash
cd module_3/react/project_1/paw-store
```

3. Install dependencies:

```bash
npm install
```

## Run Locally

Open two terminals in the project folder.

Terminal 1 (frontend):

```bash
npm run dev
```

Terminal 2 (mock API):

```bash
npm run json-server
```

Application: http://localhost:5173  
Mock API: http://localhost:3001

## Test Accounts

You can use these users from the mock database:

- Admin: `admin@example.com` / `admin123`
- Client: `user@example.com` / `user123`

## Available Scripts

- `npm run dev`: starts Vite in development mode.
- `npm run json-server`: starts JSON Server with `json-server/paw-store-db.json`.
- `npm run build`: creates a production build.
- `npm run preview`: previews the local production build.
- `npm run lint`: runs ESLint.
- `npm run lint:fix`: automatically fixes lint issues.
- `npm run format`: runs Prettier and then `lint:fix`.

## Mock API Endpoints

JSON Server exposes, among others, these endpoints:

- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PATCH /products/:id`
- `DELETE /products/:id`
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `GET /orders`
- `GET /orders/:id`
- `POST /orders`

## Functional Architecture

### Navigation

The app uses `react-router-dom` with `BrowserRouter` and centralized route constants.  
Current routes and pages:

- Home
- Products
- ProductDetails
- Admin
- EditProduct
- Login
- Register
- Cart
- Checkout
- Confirmation
- NotFound

Notes:

- `/contacto` is still a placeholder route and currently redirects to Home.
- The cart button in the header shows the current item count.

### Global State (Context API)

- AuthContext: manages authenticated user (loggedUser), login, register, logout, and isAuthenticated.
- ProductsContext: fetches products from API on mount and exposes products, loading state, errors, `setProducts`, `getProductById`, `createProduct`, `updateProduct`, and `deleteProduct`.
- CartContext: manages cart items, quantity changes, item removal, total price, and total item count.
- CheckoutContext: creates orders and exposes checkout error handling.

### Services

- api: shared Axios client with `http://localhost:3001` base URL and request interceptor.
- productsService: product HTTP operations with Axios.
- authService: mock login via /users, registration via POST /users, and localStorage persistence.
- checkoutService: order creation via POST `/orders`.

The shared API client automatically attaches an Authorization header when a token exists in localStorage.

## Implemented Features

- Home page.
- Products list with empty state handling.
- Loading screen while products are being fetched.
- Product details page.
- Shopping cart with add, remove, increase, and decrease quantity actions.
- Checkout page with buyer information form.
- Order confirmation page with purchase summary.
- User login (mock).
- Client user registration.
- Admin panel visible only for admin role.
- Create product from admin panel.
- Edit product from admin panel.
- Delete product with confirmation.
- Access control: non-admin users trying to reach the Admin panel see an Access Denied screen and are redirected to Home after a delay.
- Form handling and validation using react-hook-form.
- Authenticated user persistence in localStorage.
- Cart total and item count calculation.
- Redirect to login when a user tries to continue checkout without being authenticated.

## Project Structure

```text
paw-store/
	json-server/
		paw-store-db.json
	public/
	src/
		assets/
			icons/
		components/
			AccessDenied/
			Checkout/
			Footer/
			Forms/
				CreateProductForm/
				EditProductForm/
				LoginForm/
				ProductForm/
				RegisterForm/
			Header/
			Loading/
		context/
			AuthContext.jsx
			CartContext.jsx
			CheckoutContext.jsx
			ProductsContext.jsx
		hooks/
			useCreateProduct.js
			useDeleteProduct.js
			useEditProduct.js
			useLoading.js
			useRequireAdmin.js
		pages/
			Admin/
			Cart/
			Checkout/
			Confirmation/
			EditProduct/
			Home/
			Login/
			NotFound/
			ProductDetails/
			Products/
			Register/
		routes/
			AppRoutes.jsx
			routes.js
		services/
			api.js
			authService.js
			checkoutService.js
			productsService.js
		utils/
			validatePassword.js
		App.jsx
		index.css
		main.jsx
	eslint.config.js
	index.html
	package.json
	README.md
	vite.config.js
```

## Current Scope

The project uses a mock backend with JSON Server, so authentication and order creation are simulated. The code is structured to be connected to a real backend later.

Current limitations:

- Authentication is mock-based and uses `/users` from JSON Server.
- The Authorization header is prepared in Axios, but JSON Server does not validate real tokens.
- The contact page is not implemented yet.
- Cart data is handled in memory and is not persisted after a full refresh.
- Order confirmation email logic is prepared in comments, but not active because it needs a real backend.
