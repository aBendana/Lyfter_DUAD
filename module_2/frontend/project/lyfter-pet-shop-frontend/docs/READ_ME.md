# For all project pages:

    1. Technologies:
    a. HTML5
    b. CSS3
    c. JavaScript

    2. Runtime Requirements:
    a. Node.js v24.13.1
    b. Python 3.13.3

    3. Packages:
    a. Axios (call from https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js)
    b. CircleType v2.3.0

    4.For testing purposes:
    a. run app.py from lyfter_pet_shop_backend
    b. In terminal, in path lyfter-pet-shop-frontend",
     run command: "python -m http.server 8000"
    c. open a browser and type: "http://localhost:8000"

a) Landing Page (index.html)

    i. Authentication links:

        Login → redirects the user to /pages/login.html
        Register → redirects the user to /pages/register.html

    ii. Top navigation bar links:
    The top navigation bar contains links with two different behaviors:

        + Products → redirects the user to /pages/products.html
        + About Us → scrolls smoothly to the About Us section within the same page
        + Locations → scrolls smoothly to the Our Locations section within the same page
        + Contact Us → scrolls smoothly to the Contact Us section within the same page

    iii. Welcome title animation:
    The main heading is rendered as a curved arc using the CircleType library (radius: 720px).

    iv. Rotating banners:
    Three promotional banners (Food, Toys, Accessories) rotate automatically every 3 seconds.

    v. Featured Products section:
    On page load, products are fetched from the backend via GET /products.
    The full list is shuffled randomly and 5 products are displayed in the
    Featured Products grid. Each card shows the product image (determined by
    target_species), name, description, and price. If the fetch fails, an
    inline error message is displayed instead.

    vi. Product card navigation:
    Clicking any product card in the Featured Products section redirects the user
    to /pages/product-detail.html?id={productId}, passing the product id as a
    query parameter so the detail page can load the correct product.

    vii. Social media icons:
    Each icon in the Follow Us footer section opens the corresponding social media
    profile in a new browser tab:

        + Facebook → facebook.com/lyfterpetshop
        + Instagram → instagram.com/lyfterpetshop
        + Pinterest → pinterest.com/lyfterpetshop
        + YouTube → youtube.com/lyfterpetshop

    viii. Logged-in user header:
    If a valid session is found in localStorage under the key lyfterPetShopSession,
    the page dynamically renders an additional navigation bar (#nav-logged-user) containing:

        + A welcome message displaying the user's name
        + Account button → redirects to the user account page
        + Cart button → redirects to the shopping cart page
        + Sign Out button → clears the session and logs the user out
        + If no session exists, this navigation bar remains hidden.

b) Login Page (login.html)

    i. Input validation (client-side):
    Before making any request, the form checks that both fields are filled in.
    If either email or password is empty, an error message is displayed inline:
    "Please enter email and password." — no request is sent.

    ii. Login request on submit:
    Credentials are sent via POST to the backend endpoint: http://127.0.0.1:5000/auth/login
    Payload: { email, password }

    iii. Successful login:
    If the server responds with a valid access_token:

        + The full user object (plus isLoggedIn: true and loginAt timestamp) is stored in localStorage
        under the key lyfterPetShopSession.
        + A welcome message is displayed: "Welcome Back to Lyfter Pet Shop, {name}."
        + For client role only: the total number of cart items is fetched via GET /cart and stored
          in localStorage under the key lyfterPetShopCartItems, so the cart badge reflects the
          correct count immediately after login.
        + After 1000ms, the user is redirected based on their role:
            administrator → ./admin-dashboard.html
            client → ./products.html

    iv. Failed login:
    If credentials are invalid or the server returns an error:

        + The error message from the API is displayed inline (error or message field)
        + If no API message is available, falls back to: "Login failed. Please try again."
        + No redirect occurs — the user stays on the login page

    v. Register link:
    Below the login form, a link "Don't have an account? Register here" redirects the user
    to register.html.

    vi. IMPORTANT NOTE — Token Storage

> ⚠️ **Security warning:** In a real production environment, tokens must never be
> stored in `localStorage` or `sessionStorage` due to XSS vulnerability risks.

        How tokens are handled in this project:

          1. ACCESS TOKEN — stored in memory only via setAccessToken().
             It is never written to localStorage or sessionStorage.
             It is lost on page refresh (by design — initAuth() will obtain a new one using the refresh token).

          2. REFRESH TOKEN — the correct production approach is to store it in an
             httpOnly cookie set by the backend, which JavaScript cannot access:

             response.set_cookie(
               "refreshToken",
               value=refresh_token,
               httponly=True,   # inaccessible to JS — protected from XSS
               secure=True,     # HTTPS only
               samesite="Strict",
               max_age=604800   # 7 days
             )

        HOWEVER, for this exercise, and to AVOID modifications and unexpected responses from the BACKED,
        the refresh token is gonna be stored in Session Storage, which is NOT recommended for PRODUCTION ENVIRONMENTS.

c) Register Page: (register.html)

    i. Page Structure:
    Form with five fields: Name, Email, Phone Number, Password, and Confirm Password.
    A static hint paragraph below the password field shows the requirements before submission.

    ii. Input validation (client-side):
    Password strength is validated using a regex before any request is sent:

        Regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-]).{8,}$/

        + Passwords do not match → error shown, both password fields cleared.
        + Password fails regex → error shown, both password fields cleared.

    iii. Registration request on submit:
    POST http://127.0.0.1:5000/auth/register — Payload: { name, email, password, phone_number }
    On success: tokens stored (same as Login — see section b, incise vi), user saved to
    localStorage (lyfterPetShopSession), redirected to ./products.html after 1000ms.

    iv. Failed registration — error messages:

        + Duplicate email → "This email is already registered. Please use a different email."
        + Field too long → "One or more fields exceed the maximum allowed length."
        + Any other error → "Registration failed. Please try again."

d) Products Page (products.html):

    * Open page — no authentication required. Accessible by visitors, clients and admins.
    ** All product data is fetched from public endpoints (GET /products, GET /products/search).
    *** No initAuth() is called on this page.

    i. Page structure:
    Top nav-info bar + species/search nav bar + products grid (#products-grid) +
    pagination bar (#pagination-nav) + footer.

    ii. On page load & Pagination:
    Fetches GET /products?page=1 — 12 products per page (backend-defined).
    Total pages calculated client-side via Math.ceil(total / 12).
    Pagination controls: << < Page {n} > >> — navigate pages, re-render grid on change.

    iii. Species filter:
    Eight buttons: All, Dogs, Cats, Birds, Fish, Reptiles, Rodents, Small Mammals.

        + Specific species → GET /products?target_species={species}, no pagination.
        + "All" → reloads default page 1 and restores pagination.

    iv. Search:
    On submit: GET /products/search?column=name&value={term}.
    Empty input → no request. Updates section title with results or "No results found".
    Grid is re-rendered and search input is cleared.

    v. Product card navigation:
    Clicking a card → ../pages/product-detail.html?id={productId}

    vi. Logged-in user header:
    If session found in localStorage (lyfterPetShopSession), renders:
    welcome message, Account, Cart, and Sign Out buttons (clears session → ../index.html).

    vii. Info links (nav-info):
    Visitors: Login → ./login.html | Register → ./register.html
    All users:
        + About Us → ../index.html#section-about
        + Locations → ../index.html#section-locations
        + Contact Us → ../index.html#section-contact

e) Product Detail Page (product-detail.html):

    * Authentication is NOT required to view. Product data from GET /products/{id} (public).
    ** Authentication IS required to add to cart.
    *** Product id read from URL query parameter: ?id={productId}

    i. Page structure:
    Nav-info + header search area (logo, tagline, search form) + product detail section
    (#product-detail-section) + search results grid (#products-search-grid) +
    featured products (#section-products) + footer.

    ii. On page load:
    Fetches GET /products/{id} and renders: image (via getCategoryImage()), name,
    description, price, and stock/quantity selector.
    No id in URL → "No product ID found." | Fetch fails → "Product details not available."

    iii. Stock status and quantity selector:
    + Out of stock → "Out of Stock" message, no selector or button rendered.
    + In stock → "In Stock" message + <select> from 1 to 10 maximum quantity
    of the product the client can buy or quantity in stock + Add to Cart button.

    iv. Add to Cart:
    Visitor/admin → button disabled, no handler. Client → on click:
        + Already in cart → PATCH to update quantity → modal: "Quantity updated."
        + New item → POST /cart → modal: "Successfully added {n} item(s) to cart!"
        + Failure → modal: "Could not add to cart"
    lyfterPetShopCartItems in localStorage refreshed on every successful request.
    Modal buttons: Continue Shopping → products.html | Go to Cart → cart.html

    v. Search:
    Header search form → GET /products/search?column=name&value={term}.
    Empty input → no request. Hides product detail section, renders results grid.
    Title: "Search Results for "{term}"" or "No results found for "{term}"".

    vi. Featured Products & Info links:
    5 random products loaded on entry; clicking any card → product-detail.html?id={id}.
    Visitors: Login → ./login.html | Register → ./register.html
    All users:
        + Products → ../pages/products.html
        + About Us → ../index.html#section-about
        + Locations → ../index.html#section-locations
        + Contact Us → ../index.html#section-contact

f) Cart Page (cart.html)

    * Authentication IS required. All cart endpoints use a Bearer token via initAuth().
    ** Only clients have an active cart. The page is not intended for visitors or admins.

    i. Page structure:
    Nav-info + two-column main (#cart-items-section | #cart-summary-section) + footer.

    ii. On page load:
    Fetches GET /cart. Each item rendered with: image (getCategoryImage()), name,
    quantity selector (0–min(stock,10), pre-selected), "Change quantity" button, and
    item price (qty × unit price). Summary shows total items and subtotal.
    Empty cart → title: "Your cart is empty", items/summary hidden, no checkout button.

    iii. Change quantity:
    PATCH /cart/item with { product_id, quantity }.
    qty = 0 → card removed from DOM. Item price, summary total and lyfterPetShopCartItems
    in localStorage all updated in real time. Failure → alert "Failed to update quantity: {error}".

    iv. Checkout & Info links:
    "Proceed to Checkout" → ./checkout.html
    All users:
        + Products → ./products.html
        + About Us → ../index.html#section-about
        + Locations → ../index.html#section-locations
        + Contact Us → ../index.html#section-contact

g) Checkout Page (checkout.html)

    * Authentication IS required. All requests use a Bearer token via initAuth().
    ** Only clients with an active cart can access this page.
    *** Shipping methods, payment methods, and discount vouchers are defined
        client-side and stored in sessionStorage on page load.

    i. Page structure:
    Nav-info + two-column main (purchase form left | order summary right) + footer.

    ii. Access control — active cart check:
    Before rendering any content, GET /cart is called on every page load and also
    on every back-navigation using the bfcache pageshow event (to prevent users from
    returning to the checkout via the browser back button after placing an order).
    If the cart is empty or the request fails, the user is immediately redirected
    to cart.html. The rest of the page only initializes if the cart check passes.

    iii. Purchase information form:
    + Full Name, Email, Phone → from lyfterPetShopSession (localStorage)
    + Shipping Address → GET /shipping-addresses (address, canton, province, postal code)
    + Shipping Method (sessionStorage lyfterPetShopShippingMethods):
        Standard $5.00 | Express $15.00 | Overnight $25.00
    + Payment Method: Credit Card, Debit Card, PayPal, Bank Transfer
    + Discount Code → free text + Apply button (see incise iv)

    iv. Order summary & Discount:
    Populated from GET /cart. Each item: "{name} x {qty} = ${total}".
    Tax = 7% of (subtotal − discount + shipping). Total = subtotal − discount + shipping + tax.
    Discount codes (checked against sessionStorage lyfterPetShopDiscounts):
        FIRSTBUY 10% | HAPPYDOG 5% | SUMMERTIME 15%
    Tax and total recalculate dynamically on discount apply or shipping method change.

    v. Place Order:
    All three selectors (address, shipping, payment) required — browser native validation
    if any empty. On valid submit: POST /invoices { shipping_address_id, shipping_method,
    payment_method, discount } → orderCompleted = true, lyfterPetShopCartItems = 0,
    lyfterPetShopInvoiceId stored in sessionStorage → redirect to confirmation.html.

    vi. Info links:
        + Products → ./products.html
        + About Us → ../index.html#section-about
        + Locations → ../index.html#section-locations
        + Contact Us → ../index.html#section-contact

h) Confirmation Page (confirmation.html)

    * Authentication IS required. Invoice data is fetched using a Bearer token.
    ** Direct access is blocked. The page is only reachable after a completed order.

    i. Page structure:
    Nav-info + confirmation container (thank-you heading, customer info, products list,
    order summary, "Main Page" link → ../index.html) + footer.

    ii. Direct-access guard:
    On DOMContentLoaded, checks localStorage for orderCompleted. If absent or false →
    immediate redirect to ../index.html. If present, it is removed before loading,
    so refreshing the page also redirects away.

    iii. Invoice data load:
    Invoice id read from sessionStorage (lyfterPetShopInvoiceId) → GET /invoices/{id}.
    Response stored in sessionStorage (lyfterPetShopInvoiceData) for all display modules.
    Fetch failure → inline error in the customer info section.

    iv. Customer info section:
    + Order # → invoice id
    + Confirmed to → user email (localStorage)
    + Shipped To → name, shipping method, address (canton, province, postal code)
      fetched from GET /shipping-addresses/{id}
    + Payment Method → from invoice data

    v. Products list & Order summary:
    Each item: "{product_name} x {quantity} = ${line total}"
    Totals from invoice data: Subtotal, Discount, Shipping, Tax (7%), Total.

    vi. Info links:
        + Products → ./products.html
        + About Us → ../index.html#section-about
        + Locations → ../index.html#section-locations
        + Contact Us → ../index.html#section-contact

i) Customer Dashboard (customer-dashboard.html)

    * Authentication IS required. All data requests use a Bearer token via initAuth().
    ** Intended for client role users only.

    i. Page structure:
    Nav-info + left sidebar (5 entries: 👤 Personal Info, 📍 Shipping Addresses,
    🔒 Change Password, 💳 Payment Methods, 📦 My Orders) + right panel
    (#dashboard-content, replaced on each click, default shows welcome image) + footer.

    ii. Personal Info panel:
    GET /users/me → renders Name (read-only), Email and Phone (editable via "Edit Profile").
    Save → PATCH /users/me { email, phone_number }, updates localStorage, restores read-only.
    Cancel → restores original values. Failure → alert with error message.

    iii. Shipping Addresses panel:
    GET /shipping-addresses → each address rendered with Edit and Delete buttons.
    + Add New Address → form (address, canton, province, postal code) → POST /shipping-addresses.
    + Edit → pre-filled form → PATCH /shipping-addresses/{id}.
    + Delete → button rendered but intentionally NON-FUNCTIONAL (preserves order data integrity).
    ** shipping addresses data should be manage different to delete without further problems **
    On success, the panel reloads.

    iv. Change Password panel:
    Form: Current Password, New Password, Confirm New Password.
    Validations run in order:
        + Current password incorrect → "Current password is incorrect"
        + New password fails strength check → "New password does not meet the requirements"
        + New equals current → "New password cannot be the same as the current password"
        + New and confirm don't match → "New passwords do not match"
        + All pass → PATCH /users/me { password } → success message → redirect to
          login.html after 2500ms. Back button reloads Personal Info panel.

    v. Payment Methods & My Orders panels:
    Both show an "under construction" placeholder, backend NO HAS endpoints. No API calls are made.
    ** options are there just like an example of a more complete user-dashboard **

    vi. Info links:
        + Products → ./products.html
        + About Us → ../index.html#section-about
        + Locations → ../index.html#section-locations
        + Contact Us → ../index.html#section-contact

j) Admin Dashboard (admin-dashboard.html)

    * Authentication IS required. All data requests use a Bearer token via initAuth().
    ** Intended for administrator role users only.
    *** The header is unique to this page — it does not use the shared nav-info bar.

    i. Page structure:
    Custom admin-nav header + left sidebar (6 entries: 👤 Personal Info, 🔒 Change Password,
    👥 Manage Users, 🧾 Customers Orders, 🛍️ Manage Products, ➕ Create Products) +
    right panel (#dashboard-content, replaced on each click, default shows welcome image) + footer.

    ii. Admin header:
    Logo + welcome message "Welcome to the Admin Dashboard, {name}!" (from localStorage) +
    Account icon → admin-dashboard.html | Products icon → products.html |
    Sign Out icon → clears session and refresh token → ../index.html

    iii. Personal Info panel:
    Data read from localStorage (lyfterPetShopSession). Renders name, email, phone (read-only).
    Edit Profile → enables email and phone inputs.
    Save → PATCH /users/{id} { email, phone_number }, updates localStorage. Cancel → reverts.

    iv. Change Password panel:
    Same implementation as Customer Dashboard (section i, incise iv).
    Three fields with same sequential validations. On success → login.html after 2500ms.

    v. Manage Users panel:
    GET /admin/users → paginated table (10/page): ID, Full Name, Email, Phone, Role.
    + Total Clients count | Search by User ID (Enter) | Pagination: < {page} / {totalPages} >
    + View → user detail panel with Edit option → PATCH /users/{id}

    vi. Customers Orders panel:
    GET /admin/invoices → paginated table (10/page): Invoice #, Customer Id, Date, Payment, Total.
    + Total Sales sum | Search by Invoice # (Enter) | Pagination: < {page} / {totalPages} >
    + View → full invoice detail (products, amounts, shipping) via GET /admin/invoices/{id}

    vii. Manage Products panel:
    GET /products → paginated table (10/page): SKU, Name, Stock, Price.
    + Total Products count | Search by SKU partial/exact (Enter) | Pagination: < {page} / {totalPages} >
    + View → product detail panel with Edit option → PATCH /products/{id}

    viii. Create Products panel:
    Form fields: SKU (text), Name (text), Description (textarea),
    Target Species (select: Dog, Cat, Fish, Bird, Small Mammal, Reptile, Rodent),
    Price (number), Stock (number).
    Submit → POST /products. Success → confirmation message. Failure → inline error.

---

> 🔐 **NOTE — Authentication flow for protected endpoints:**
>
> All requests to protected backend endpoints (except public product endpoints) use
> two utility functions to attach a valid Bearer token:
>
> - `initAuth()` from `refresh-auth.js` — silently refreshes the access token using
>   the refresh token stored in sessionStorage before each protected request.
> - `getAccessToken()` from `token-manager.js` — retrieves the current in-memory
>   access token to include in the `Authorization` header.
>
> Together they ensure that both `client` and `administrator` roles can access their
> respective endpoints without requiring the user to log in again mid-session.
