# Lyfter Pet Shop — Frontend General Description

## Overview

Lyfter Pet Shop is a multi-page e-commerce web application for a fictional pet shop. The frontend is built with vanilla HTML, CSS, and modular JavaScript (ES Modules) and communicates with a REST API backend. The application supports two user roles — **client** and **administrator** — each with a distinct navigation flow.

---

## Pages

| File                            | Purpose                                       |
| ------------------------------- | --------------------------------------------- |
| `index.html`                    | Landing page (entry point)                    |
| `pages/login.html`              | Login form                                    |
| `pages/register.html`           | New user registration                         |
| `pages/products.html`           | Product catalogue with pagination and search  |
| `pages/product-detail.html`     | Individual product detail and add-to-cart     |
| `pages/cart.html`               | Shopping cart                                 |
| `pages/checkout.html`           | Order checkout (shipping, payment, discount)  |
| `pages/confirmation.html`       | Order confirmation after purchase             |
| `pages/customer-dashboard.html` | Customer account (profile, addresses, orders) |
| `pages/admin-dashboard.html`    | Admin panel (users, products, invoices)       |

---

## Important Details

- Inputs only accept their own data type (e.g. text fields reject numbers and vice versa).

- Password creation and validation use regex to enforce strength requirements.

- If the previous user did not log out, their session data remains in `localStorage`, so the page renders as if they are still logged in (nav header, cart badge, etc.). However, the first time they perform any action that requires a backend request (e.g. adding to cart, placing an order), they must log in again. This is a one-time prompt per browser tab: once they authenticate, a new refresh token is stored in `sessionStorage` and is used to silently generate new access tokens for all subsequent requests during that session.

- At this link https://drive.google.com/drive/folders/1-uMognTbqflWteWGEukMzwcZ3hduc57D there some videos to see the frontend with actual backend in development envioroment. Is a general navigation, not all the functions are show but important steps.

## Navigation Flow

### 1. Landing Page (`index.html`)

The entry point of the application. The top navigation bar shows:

- **Login / Register** links → redirect to `pages/login.html` and `pages/register.html`.
- **Products** link → redirects to `pages/products.html`.
- **About Us / Locations / Contact** links → smooth-scroll to their respective sections within the same page.

If the user is already logged in (session stored in `localStorage`), the Login/Register bar is replaced by a logged-user header showing the user's name, a **Cart** button, an **Account** button, and a **Logout** button.

### 2. Authentication

**Login (`pages/login.html`)**

- The user submits email and password.
- On success, the session data (name, role, tokens) is stored in `localStorage` and `sessionStorage`.
- **Clients** are redirected to `pages/products.html`.
- **Administrators** are redirected to `pages/admin-dashboard.html`.

**Register (`pages/register.html`)**

- The user fills out a registration form with password-strength validation.
- On success, the user is redirected to `pages/login.html`.

**Logout**

- Clears `localStorage` session data, cart items, and the refresh token from `sessionStorage`, then redirects to `index.html`.

### 3. Products (`pages/products.html`)

- Displays a paginated product catalogue (12 items per page).
- Navigation controls: **Beginning**, **Back**, **Next**, and **End** buttons.
- A search bar allows filtering products by name or species category.
- Clicking a product card navigates to `pages/product-detail.html?id={productId}`.

### 4. Product Detail (`pages/product-detail.html`)

- Displays full product information loaded from the query parameter `id`.
- The **Add to Cart** button adds the product to the user's cart (requires login).
- A success modal is shown after adding, with an option to go to the cart or continue shopping.

### 5. Cart (`pages/cart.html`)

- Lists all items currently in the user's cart with quantities and subtotals.
- The user can adjust quantities or remove items.
- A **Proceed to Checkout** button navigates to `pages/checkout.html`.

### 6. Checkout (`pages/checkout.html`)

- The user selects a shipping address (from saved addresses), shipping method, and payment method.
- An optional discount voucher code can be applied.
- Clicking **Place Order** posts the invoice to the backend.
- On success, the page redirects to `pages/confirmation.html`.

### 7. Order Confirmation (`pages/confirmation.html`)

- Displays a summary of the completed order using the invoice ID stored in `sessionStorage`.
- Provides a button to continue shopping (back to `pages/products.html`).

### 8. Customer Dashboard (`pages/customer-dashboard.html`)

- Accessible only to logged-in clients via the **Account** button in the header.
- Sections:
  - **Personal Info** — view and edit name and contact details.
  - **Change Password** — update account password.
  - **Shipping Addresses** — view, add, and edit saved shipping addresses.
  - **My Orders** — view past invoices and order details.

### 9. Admin Dashboard (`pages/admin-dashboard.html`)

- Accessible only to logged-in administrators.
- Sections:
  - **Users** — list all users, view details, edit user information.
  - **Products** — list all products, create new products, edit or delete existing ones.
  - **Invoices** — list all invoices and view their details.

---

## Header Navigation (Shared Across Pages)

Every page includes two header nav bars rendered dynamically by JavaScript:

- **`nav-info`** — shown when the user is **not** logged in. Contains Login, Register, Products, About Us, Locations, and Contact links.
- **`nav-logged-user`** — shown when the user **is** logged in. Contains the user's name, a Cart badge (showing item count from `localStorage`), an Account button, and a Logout button.

The correct header is determined by checking `lyfterPetShopSession` in `localStorage` on every page load.

---

## Token Management

- **Access token** — stored in memory (a module-level variable in `token-manager.js`), never persisted to storage.
- **Refresh token** — stored in `sessionStorage` under `lyfterPetShopRefreshToken`.
- **Session data** (user name, role) — stored in `localStorage` under `lyfterPetShopSession`.
- **Cart item count** — stored in `localStorage` under `lyfterPetShopCartItems` for badge display without an extra API call.
