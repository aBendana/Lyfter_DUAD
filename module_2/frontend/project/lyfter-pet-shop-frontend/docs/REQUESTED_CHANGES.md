# Requested Changes

1. **Incorrect use of `px` units**

   a) Some containers and font sizes were incorrectly set in `px`. These were updated to relative units (`rem`/`em`) where appropriate.

   b) Borders and shadows remain in `px`. The project brief does not explicitly address them. After testing relative units, the visual appearance of borders and shadows degraded noticeably in responsive views. Research supports this: rem-based shadows can look disproportionate with accessibility settings, and other developers expect `px` for borders and shadows — using relative units there can cause confusion.

   c) For breakpoints, the recommended approach is to use `em` (or `rem`) in media queries, since both units are always relative to the browser's default font size (16px) in that context, regardless of the document's root `font-size`. This ensures breakpoints respect the user's zoom level and accessibility preferences. Use `em` if the breakpoint should scale with the browser's base font size; use `rem` if it should follow the document root. Avoid `px` as the first choice when accessibility and flexibility are the goal.

2. **Empty catalog**

   In `displayProducts`, a user-friendly message is now shown when the catalog is empty. The same guard was applied to the other buttons that load products by different criteria (`displayProductsByPages` and `displayProductsBySpecies`), since all buttons are available from the moment the products page loads.

3. **Regex-based input validation**

   A new module `input-restrictions.js` was created under `js/utils/`. Regex validations were added across multiple modules in the dashboards, login, and register pages where forms and inputs are used. Error messages are shown either via labels with the `error-message` class or via `alert()` calls, depending on the module. Files modified include `edit/create-product`, `edit-user`, `edit/create shipping address`, and others.

4. **Admin dashboard access control**

   Authentication via `initAuth` was added to `main.js`. This ensures that accessing the admin dashboard for the first time in a session always requires going through the login flow, since no refresh token exists at that point. Once logged in, the refresh token is stored in `sessionStorage`, enabling all functions that depend on it. The minor trade-off is that the admin can only freely navigate landing and product pages when opening the browser directly to public pages — but this is acceptable since it does not interrupt the admin's primary workflow.
