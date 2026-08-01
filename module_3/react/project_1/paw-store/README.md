# Paw Store

Paw Store is a frontend application built with React + Vite for a pet products e-commerce experience.

The current project includes mock authentication, user registration, a products catalog, product details, and an admin panel with CRUD operations connected to JSON Server.

## Stack

- React 19
- Vite 8
- JavaScript (ESM)
- CSS
- Axios
- react-hook-form
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

## Functional Architecture

### Navigation

The app uses local state navigation in App.jsx (it does not use React Router).  
Main pages:

- Home
- Products
- ProductDetails
- Admin
- EditProduct
- Login
- Register

### Global State (Context API)

- AuthContext: manages authenticated user (loggedUser), login, register, logout, and isAuthenticated.
- ProductsContext: fetches products from API on mount and exposes products, setProducts, getProductById, createProduct, updateProduct, and deleteProduct.

Note: CatalogContext still exists in the project, but it is not part of the main runtime flow. (It will be deleted in the final project submission)

### Services

- productsService: product HTTP operations with Axios.
- authService: mock login via /users, registration via POST /users, and localStorage persistence.

Both services automatically attach an Authorization header when a token exists in localStorage.

## Implemented Features

- Home page.
- Products list with empty state handling.
- Loading screen when entering Products/Admin.
- Product details page.
- User login (mock).
- Client user registration.
- Admin panel visible only for admin role.
- Create product from admin panel.
- Edit product from admin panel.
- Delete product with confirmation.
- Form handling and validation using react-hook-form.
- Authenticated user persistence in localStorage.

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
			CatalogContext.jsx
			ProductsContext.jsx
		data/
			products.json
		hooks/
		pages/
			Admin/
			EditProduct/
			Home/
			Login/
			ProductDetails/
			Products/
			Register/
		services/
			authService.js
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

Although the project currently focuses on simulated authentication and product management, the code is ready to be connected to a real backend. E-commerce features, such as the shopping cart, checkout process, and contact page, are not yet implemented; these will be added in subsequent releases.
