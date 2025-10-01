GENERALIDADES DE APLICACION DE CACHE:

1. Se creó la lógica para generar, accesar e invalidar cache tanto de manera específica de un id de una fruta, así como empaginando de 10 en 10 de manera ascendente de acuerdo al valor de los ids de las frutas. En la PR se agregan algunas imagenes (CACHES*) de como se ven los caches en la base de cache de Redis.

2. Tomando como base ejercicio de la semana 7 se agregaron y modificaron (todos los demás módulos no fueron cambiados en lo absoluto) los siguientes módulos:
    a)orms_queries se crearon los métodos:
        i. select_with_pagination(data, offset, limit) obtiene los items de acuerdo al offset y el limit en orden ascendente
        ii. get_max_id() obtiene de una tabla el id con el valor mas alto
    
    b) repository_fruits se crearon los métodos:
        i. _format_fruit_for_cache(fruit_record) para poder formatear los valores que se obtendran del cache
        ii. get_fruits_pagination(page_number, items_per_page) obtiene la data que esta por paginas, items_per_page para este ejercicio fue de de 10
        iii. get_fruit_by_id_cache(column, value) obtiene un item por medio id del cache
        iv: get_fruit_max_id obtiene dentro de la tabla Fruits el id con el valor mas alto

    c) cache_manager módulo creado con los métodos vistos en la lección de Redis + varios métodos para crear empaginación, invalidar cachce, generar patterns y seleccionar dentro con un pattern en la base de datos Redis
        i. por medio del módulo redis_connection y usando un archivo .env se hace la conexión a la base de datos de Redis en cloud.redis

    d) api_fruits fueron modificados los siguientes endpoints:
        i. create_fruits():
            * se hace una busqueda del valor max_id con mayor valor en la tabla Fruits
            ** se crea la fruta
            *** con max_id borramos la última página de cache, para que no haya conflictos con la nueva fruta creada a la hora que sea parte de la última página, recordar que cada página lleva máximo 10 items, esta ordendad de acuerdo a los valors de los ids de manera ascendente y que al agregar un nuevo item a la tabla este lleva un valor mayor al max_id que le permitira ser acomodado en esta una última nueva página de cache.

        ii. show_fruits():
            * por medio de path parameters creamos o accesamos cache si la busqueda es por página y número de página (/fruits?page=3)
            ** si la busqueda es por id (/fruits?id=151) se crea o accesa cache por id
            *** las otra busquedas por path parameters se mantienen
            **** si no hay path parameters retorna todos las frutas de la tabla

        iii. update_fruits(id_value)
            * actualiza atributos de alguna fruta
            ** invalida el cache especifico de ese id
            *** invalida el cache de la pagina donde se encuentra ese id

        iv. delete_fruit(id_value)
            * elimina una fruta por id
            ** elimina todas las páginas de cache, esto es porque el valor del id puede estar en cualquier página y descuadraría los datos de las demás páginas
            *** elimina el cache individual específco por id


NOTA: se pudo haber implementado que cuando se invalida algún cache, se volviera a crear con los valores correctos en caso de update o generar por primera vez en caso de create o cuando toca invalidar la página o páginas volverlas a crear, pero al investigar obtuve las siguientes razones por lo cuál es mejor no hacerlo:

Razones para no recrear el cache inmediatamente
    1. Evita costos de computación y carga innecesaria en el servidor.
    2. Previene inconsistencias causadas por posibles retrasos o fallas al actualizar el cache manualmente.
    3. Permite usar estrategias de "cache-aside" o "lazy loading" donde la caché se rellena bajo demanda al consultar el dato.
