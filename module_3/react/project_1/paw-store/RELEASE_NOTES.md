## NOTE

Durante el desarrollo ya había realizado y fusionado los cambios principales mediante Pull Requests. Tuve problemas con el versionamiento, cometí algunos errores en los commits y hice otros cambios en otros directorios del repositorio, todo esto tuve que solucionarlo hasta quedar al día con el main para dejar de recibir errores al tratar de hacer el PR oficial, por lo tanto hice cambios en este mismo archivo de RELEASE_NOTES, por lo que este PR contiene únicamente esta modificación. Todos los cambios que se hicieron pueden ser seguidos, con los enunciados del proyecto entrega 3. Pido disculpas por no poder hacer un PR normal como es acostumbrado. La otras dos soluciones era 1. crear un rama orphan para subir todo el proyecto o 2. borrar todo el directorio tanto local como remoto, lo cuál es muy riesgoso. Al final tome la tercera opción, contar lo que me sucedió y pedir y dar gracias por la comprensión.

## 1era Ocultar el Administrador

Para ocultar el Panel del Administrador se hizo de formas para ocultarlo 1. por link se creó el hook useRequireAdmin.js que redirecciona a Home, 2. en el Header se oculta por completo el acceso "Administrador" si rol del usuario es "client"

## 2nda Register Page

Aunque no se pedía la página de Register explecitamente, en las intrucciones, aparecía en los Wireframes por lo cuál fue implementada.

## 3era Json-Server

Para probar las funcionalidades y dejar de lado el archivo de data products.json se implementó un json-server, que consta de dos endpoints /users y /products. Este server tiene varias particularidades pero para efectos de este proyecto recalcaremos 1. es capaz de producir IDs, no hace falta enviarlos para un create product por ejemplo y 2. para hacer un login hay que hacer un mock-login ya que el server no permite hacer POST como es normal es un backend real, sin embargo las dos funciones estan implemetadas en el código una para backend real con un POST y la que funciona provisionalmente con un GET (mock-login)

## 4ta CatalogContext

La forma en que se consultaban los datos de productos en las primeras dos entregas CatalogContext ya no se usa ni es llamada en ningún módulo, será eliminado del proyecto en la última entrega, por si hubieran posibles usos en el avance del proyecto.

## 5ta Interceptor

Se crea un Interceptor de solicitudes y se ejecuta antes de cada petición HTTP, si existe un token de autenticación en localStorage (cuando se hace Login o Register), se agrega automáticamente al encabezado Authorization con el esquema Bearer, con esta petición al backend se decide si el usario puede ejecutar ciertas acciones.
Esto centraliza la lógica de autenticación, de modo que los métodos del servicio (GET, POST, PATCH, DELETE) no tengan que incluir el token manualmente en cada llamada.
Apesar de que json-server no valida tokens Bearer (ignora ese encabezado) porque es una API simulada. Aun así, esta implementación deja el proyecto preparado para conectarse a un backend real que sí requiera autenticación por token.
