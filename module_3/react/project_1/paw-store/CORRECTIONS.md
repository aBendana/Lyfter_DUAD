## Correción 1:

Para solucionar el redireccionamiento silencioso agregamos 'contact' a la lista de validPages en useExistsCurrentPage.js, ahora hacer click en 'Contacto' rederige a 'home' como es pedido cuando una página no esta lista, sin embargo el link que se activaba como activo no sería 'Inicio' sino más bien 'Contacto', por lo tanto la solución a este nuevo problema fue poner explicitamente en el <a> de 'Contacto' en Header.jsx, setCurrentPage('home'), para también cumplir con que la página renderizada sea también la de link active color verde.

## Correción 2:

Para corregir que el estado de "Cargando..." no representaba la petición real al backend, se reemplazó por completo el hook useLoadingEffect por useLoading, eliminando la simulación por setTimeout. Además, este control de carga se quitó de App.jsx y pasó a formar parte del ProductsContext, que es donde realmente se ejecuta la consulta de productos.

Con este cambio, el componente Loading ya no se renderiza desde App.jsx, sino directamente desde Products.jsx, usando el estado real de carga del contexto. De esta forma, "Cargando..." se muestra únicamente durante el tiempo exacto que tarda en resolverse la carga de productos, evitando tanto esperas artificiales como mensajes prematuros de "No hay productos disponibles".

## Correción 3:

Para cumplir las Reglas de Hooks de React, se reorganizó la estructura de Admin.jsx y EditProduct.jsx para evitar hooks después de un return condicional. En ambos casos se dejó un componente contenedor que valida si el usuario es administrador y, solo si cumple esa condición, renderiza un componente interno con la lógica principal. De esta manera, los hooks como useCreateProduct, useEditProduct, useDeleteProduct y useEffect quedan ejecutándose siempre en el mismo orden dentro de su componente, evitando comportamientos inconsistentes entre renders cuando cambia el estado de isAdmin.

## Correción 4:

Texto erróneo de error de login corregido, texto corregido "Las credenciales proporcionadas no son válidas. Por favor verifica tu correo y contraseña."

## Correción 5 :

Se corrigió la restricción de acceso para usuarios sin rol de administrador en Admin.jsx y EditProduct.jsx. Antes, la protección se resolvía solo con una redirección silenciosa a Inicio usando useRequireAdmin (setCurrentPage('home')), por lo que el usuario nunca veía una explicación.

Ahora, cuando isAdmin es false, ambos módulos renderizan el componente AccessDenied, que muestra de forma explícita y visible el mensaje: "No tienes permiso para acceder a esta sección." Además, se añadió el botón "Ir a Inicio" para que el usuario tenga una salida clara e inmediata.

También se mantiene la redirección automática con delay de 7 segundos en caso que el usuario no tome ninguna acción en la vista, ahora todo ocurre con contexto.

## Correción 6:

Se corrigió el comportamiento del enlace "Administración" en el encabezado para cumplir el requisito de Estado de sesión en el encabezado. Antes, el enlace desaparecía para usuarios sin sesión o con rol de cliente, porque su render dependía de una condición de administrador. Ahora el enlace de "Administración" se mantiene siempre visible en el Header para todos los usuarios. Los ajustes se hicieron en el renderizado de Header.jsx.

## Correción 7:

Se corrigió la discrepancia de textos en la sección de inicio de sesión para alinearla con los textos oficiales del documento. Al revisar `LoginForm.jsx`, se verificó que los campos deben mostrarse como "Correo electrónico" y "Contraseña", y que el botón principal debe decir "Ingresar". Con este ajuste se reemplazan las etiquetas no oficiales "Email" / "Password" y el botón "Iniciar Sesión", dejando el formulario consistente con la especificación.

## Correción 8:

Se ajustó el tratamiento del valor de `role` para alinearlo con el contrato esperado del proyecto. Ahora se usan `admin` y `cliente`, en vez de `administrator` y `client`, por lo que se actualizó la lógica del frontend y el backend mock para que las validaciones, el registro y la persistencia trabajen con esos nombres de forma consistente.

Módulos actualizados: src/pages/Login/Login.jsx, src/pages/Admin/Admin.jsx, src/pages/EditProduct/EditProduct.jsx, src/components/Forms/RegisterForm/RegisterForm.jsx, json-server/paw-store-db.json

## Correción 9:

Se corrigió la duplicación de configuración de API en los servicios. Antes, `authService.js` y `productsService.js` definían por separado la misma `API_URL`, su propia instancia de `axios` y su propio interceptor de token. Ahora esa configuración quedó centralizada en `src/services/api.js`, que expone una única instancia compartida de cliente HTTP. Con esto, ambos servicios consumen el mismo cliente y se evita mantener lógica repetida en más de un archivo.

Módulos actualizados: src/services/api.js, src/services/authService.js, src/services/productsService.js

## Correción 10:

Se corrigió que ProductsContext.jsx no capturaba los errores de las llamadas a productsService. Antes, si getAllProducts, createProduct, updateProduct o deleteProduct fallaban, la promesa quedaba rechazada sin manejar: no existía ningún estado de error ni un mensaje visible para el usuario, solo quedaba registrado como una falla silenciosa. Para resolverlo se definió el siguiente flujo:

1. En productsService.js, cada método captura el error de la petición, lo muestra en consola y lo relanza con `throw new Error(...)`.

2. En ProductsContext.jsx cada operación tiene su propio estado de error, en vez de compartir uno solo: `loadProductsError` (carga inicial del catálogo), `createProductError` (creación), `updateProductError` (edición) y `deleteProductError` (eliminación). Cada método envuelve la llamada al servicio en un try/catch, limpia su propio error antes de intentar la operación (por ejemplo `setCreateProductError('')`) y, si la petición falla, guarda un mensaje descriptivo únicamente en su estado correspondiente.

3. Los cuatro estados se exponen en el value del contexto y cada componente consume solo el que le corresponde, sin comparar texto para decidir qué mostrar:
   - Products.jsx muestra `loadProductsError` cuando falla la carga inicial del catálogo.
   - Admin.jsx muestra `loadProductsError` (fallo de carga) y `deleteProductError` (fallo al eliminar) como mensajes independientes en el panel.
   - CreateProductForm.jsx pasa `createProductError` como `requestErrorMessage` a ProductForm.jsx, mostrándolo únicamente dentro del formulario de creación.
   - EditProductForm.jsx pasa `updateProductError` como `requestErrorMessage` a ProductForm.jsx, mostrándolo únicamente dentro del formulario de edición.

Con este cambio, cualquier fallo real de backend deja de ser silencioso, el usuario siempre recibe una respuesta visible en pantalla, y cada mensaje aparece exactamente en una sola sección (evitando que un error de creación se repita también en el panel de Admin, o que un error de carga se confunda con "no hay productos para gestionar").

Módulos actualizados: src/services/productsService.js, src/context/ProductsContext.jsx, src/pages/Products/Products.jsx, src/pages/Admin/Admin.jsx, src/components/Forms/ProductForm/ProductForm.jsx, src/components/Forms/CreateProductForm/CreateProductForm.jsx, src/components/Forms/EditProductForm/EditProductForm.jsx

## Corrección 11:

El módulo CatalogContext.js ha sido eliminado ya que difería con el requesito actual del proyecto de: "ya no debe dependerse del archivo JSON como fuente de datos". Antes de eliminarlo se verificó que realmente no fuera utilizado o llamado en alguna parte del proyecto.

## Corrección 12:

Se eliminaron de `authService.js` los métodos `login()`, `getToken()` e `isAuthenticated()` porque quedaron inconsistentes e inutilizables frente al flujo real de autenticación de la app:

- `AuthContext.jsx` (único consumidor de `authService`) solo llama a `mockLogin()`, `register()` y `logout()`. No eran llamados desde ningún otro archivo (páginas, componentes, hooks), por lo que eran código muerto.

- `mockLogin()` guarda en `localStorage` el objeto `user` completo, sin ningún campo `token`. Por lo tanto `getToken()` (`JSON.parse(localStorage.getItem('user'))?.token`) siempre devolvía `undefined`, e `isAuthenticated()`, que dependía de `getToken()`, siempre devolvía `false`. Ninguno de los dos podía funcionar correctamente con el flujo real de la app.

- `login()` usaba `localStorage.setItem('token', ...)`, una clave distinta a la que realmente usa el resto del flujo (`user`). Si alguna vez se hubiera usado, `logout()` no la habría limpiado, dejando datos huérfanos en `localStorage`.
