# Primera corrección:

Antes el detalle guardaba el objeto completo del producto y, si se editaba en Administración, podían mostrarse datos desactualizados; se resolvió guardando solo el id y consultando el producto directamente en el catálogo actual cada vez que se renderiza la vista de detalle.

# Segunda corrección:

Cuando un producto se elimina desde Administración, la vista de detalle ya no depende de una copia vieja porque ahora busca por id en el catálogo actual; si ese id ya no existe, se muestra correctamente el mensaje de que no se encontró el producto.

# Tercera corrección:

En Administración, cuando el catálogo quedaba vacío, se ocultaba el formulario de crear producto y el usuario no podía agregar nuevos desde esa misma pantalla; se resolvió mostrando el formulario siempre y usando una condición para alternar solo entre el mensaje de "No hay productos" y la tabla cuando sí existen productos.

# Cuarta corrección:

Al crear productos nuevos, el id se calculaba con la longitud del catálogo y podía repetirse si antes se habían eliminado productos, causando conflictos al editar, eliminar o renderizar la lista; se resolvió calculando siempre el siguiente id a partir del id más alto existente en el catálogo actual y sumándole 1 para garantizar ids únicos.

# Quinta corrección:

Después de guardar una edición, el producto sí se actualizaba pero el usuario se quedaba en la vista de edición sin regresar al flujo normal; se resolvió reutilizando las props de navegación del componente para volver automáticamente al panel de administración y limpiar el producto seleccionado al finalizar el submit.

# Sexta corrección:

En la página de inicio se estaban usando selectores globales (p y a) que podían afectar estilos de otras pantallas; por ser un ajuste sencillo, se corrigió cambiando esos selectores a .home p y .home a para que los estilos queden limitados solo al contenido de Home.

# Séptima corrección:

En la edición de productos, EditProduct.jsx enviaba props de configuración (submitLabel, genericErrorMessage y showCancelButton) a EditProductForm, pero ese componente no las recibía y mantenía esos valores hardcodeados, generando un contrato incoherente; se resolvió dejando a EditProductForm con configuración interna fija y eliminando de EditProduct.jsx las props que no tenían efecto real.

# Octava corrección:

Las funciones del módulo de hooks para crear y eliminar productos no seguían de forma consistente la convención de React de usar el prefijo use cuando internamente consumen otros hooks, lo que puede confundir la lectura y debilitar validaciones del linter; se resolvió estandarizando el nombre a useCreateProduct u useDeleteProduct y actualizando su import y uso en Administración para mantener el contrato de hooks claro y coherente.

# Novena corrección:

Después de crear un producto con éxito, el formulario mantenía los valores ingresados y eso podía generar confusión o reenvíos duplicados; se resolvió ejecutando reset en el flujo de submit exitoso mediante una prop explícita (shouldResetOnSuccess) para que la limpieza ocurra de forma controlada en creación. Nota: este punto fue un poco confuso debido que al hacer el submit los campos se limpiaban automáticamente, sin embargo luego comprendí que el reset() limpia los campos de la manera que React Hook Form espera, sincronización, reinicia el estado interior del Form entre otros.

# Décima corrección:

Al hacer clic en "Contacto", el estado de navegación cambiaba a "contact" aunque esa vista no existe en App.jsx, por lo que se terminaba mostrando Inicio lo cual es correcto, pero con la salvedad que en el menú de navegación del header se resaltaba con verde "Contacto" como si fuera la página activa; se resolvió validando la navegación antes de cambiar currentPage para que, si el destino no corresponde a una vista implementada, el estado se mantenga alineado con la página que realmente se renderiza. Se implementa un nuevo hook: useExistsCurrentPage, de esta manera solo hubo modificaciones en App.jsx sin tocar Header.jsx, este último queda siempre listo para un page contact y solo se le da mantenimiento al hook para agregar esta nueva página.

# Onceava corrección:

El hook useLoadingEffect devolvía un componente visual (Loading) en lugar de exponer solo estado, mezclando lógica de control con presentación; se resolvió refactorizando el hook para que retorne únicamente un booleano (isLoading) y moviendo la decisión de renderizar <Loading /> a App.jsx, manteniendo una separación clara de responsabilidades.

# Doceava corrección:

Los campos de Precio y Stock permitían ingresar texto libre y dependían de conversiones posteriores con Number(), lo que podía derivar en valores inválidos; se resolvió reforzando ambos inputs en ProductForm con type="number" y step específico (0.01 para precio y 1 para stock), además de validaciones adicionales en react-hook-form (valueAsNumber, min, max y validate con Number.isFinite) para bloquear datos no numéricos o fuera de rango antes del submit. Se quitó de la creación y edición de datos el Number() en el handle del submit.

# Treceava corrección:

La vista de Administración reutilizaba clases del módulo de productos, lo que generaba duplicación de estilos y riesgo de colisiones entre Admin.css y Products.css; se resolvió definiendo clases específicas para administración en Admin.jsx (por ejemplo, products-admin title-no-products, products--empty,products-admin table y products-admin table-content) y ajustando Admin.css para estilizar esas clases propias, también se eliminaron las clases products, products title dejando desacopladas ambas páginas y facilitando el mantenimiento futuro.

# Catorceava corrección:

El hook de eliminación tenía dos formas posibles de exportación, lo que podía introducir ambigüedad en los imports; se resolvió con el criterio con exportación nombrada en useDeleteProduct.js (export const useDeleteProduct) y manteniendo su consumo de forma consistente con import nombrado en Admin.jsx (import { useDeleteProduct } ...), dejando un único contrato claro para todos los hooks.

# Quinceava corrección:

En la página de edición, la lógica principal se encontraba dentro de un bloque condicional de render, lo que dificultaba la lectura y podía volver más frágil el flujo cuando cambiaba la condición entre renders; se resolvió reorganizando EditProduct.jsx para definir fuera del condicional las funciones de control (cancelEdit y handleEditSubmit) y los valores derivados del producto, dejando el if únicamente para decidir la salida visual cuando no existe el producto. Además, se incorporó un useEffect que redirige al panel de administración con un breve delay para permitir mostrar el mensaje informativo antes de volver a "Administración".

# Dieciseisava corrección:

En algunos componentes .jsx se mantenía import React from 'react'; aunque no existía ningún uso explícito de React (por ejemplo, React.useState o React.createElement), aparte que ya no es necesario apartir de React 17,lo que agregaba ruido innecesario al código; se resolvió eliminando esos imports redundantes y manteniendo únicamente los imports realmente usados por cada Como ejemplos concretos, se aplicó en Header.jsx y Home.jsx.
