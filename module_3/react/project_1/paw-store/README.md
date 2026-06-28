# Paw Store

Paw Store is a front-end React project for a pet store interface. The current version includes a home page, a products catalog, a product details view, and a loading screen when entering the products page.

This is still an in-progress project, so some planned features are not implemented yet, such as a contact page, shopping cart, and checkout flow.

## Technologies

- React 19
- Vite 8
- JavaScript
- CSS
- ESLint
- Prettier

## Main Dependencies

- react
- react-dom
- vite
- react-hook-form

### Prerequisites

- Node.js 18 or later
- npm 9 or later

## Installation and Instructions

1. Clone the repository: git clone <https://github.com/aBendana/Lyfter_DUAD>
2. navigate to project folder: cd /module_3/React/Project_1/paw-store
3. install dependency: npm install
4. install dependency: npm install react-hook-form
5. start development server: npm run dev
6. open in browser: http://localhost:5173

## Current Features

- Home page with introductory content
- Loading screen before rendering products
- Products page rendered from local JSON data
- Empty-state support when no products are available
- Product details page
- Administration panel to manage catalog products
- Create product flow from admin panel
- Edit product flow with preloaded product data
- Delete product action from admin table
- Form handling and validation with react-hook-form
- Shared catalog state via CatalogContext
- Responsive styling for core views and admin views

## Project Structure

```text
paw-store/
	public/
	src/
		assets/
			icons/
		components/
			Footer/
			Forms/
			Header/
			Loading/
		context/
		data/
			products.json
		hooks/
		pages/
			Admin/
			EditProduct/
			Home/
			ProductDetails/
			Products/
		App.jsx
		index.css
		main.jsx
	eslint.config.js
	package.json
	README.md
	vite.config.js
```
