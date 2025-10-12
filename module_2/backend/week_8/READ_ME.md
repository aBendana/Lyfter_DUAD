NOTA: El ejercicio también cuenta con la lógica para cubrir la parte EXTRA del ejercicio, en el PR se agregan algunas imagenes (CACHES*) de como se ven los caches en Redis.

Descripción general de aplicación de CACHE:

1.  Se creó la lógica para generar, accesar e invalidar cache tanto:
     a) de manera específica de un id de una fruta 
     b) paginar de 10 en 10 de manera ascendente de acuerdo al valor de los ids de las frutas
     c) toda la lista de las frutas
     d) antes de cualquier busqueda en la base de datos se verifica primero si existe en CACHE, sino existe accesa los datos a la base de datos y luego crea el CACHE con la key correspondiente de acuerdo al tipo de busqueda

2. Se agregaron diferentes métodos en los módulos de repository_fruits y orms_queries para poder manejar las peticiones específicas del cache_manager.

3. En el módulo cache_manager por medio de comentarios esta específicado los métods utilizados para cachear individualmente, paginar y el cacheo de todas las frutas.

4. En api_fruits fueron modificados los siguientes endpoints:
        i. create_fruits():
            * se hace una busqueda del valor max_id con mayor valor en la tabla Fruits
            ** se crea la fruta
            *** con max_id borramos la última página de cache, para que no haya conflictos con la nueva fruta creada a la hora que sea parte de la última página, recordar que cada página lleva máximo 10 items, esta ordendad de acuerdo a los valors de los ids de manera ascendente y que al agregar un nuevo item a la tabla este lleva un valor mayor al max_id que le permitira ser acomodado en esta una última nueva página de cache.
            **** se borra la key fruits:all

        ii. show_fruits():
            * por medio de query parameters creamos o accesamos cache si la busqueda es por página (/fruits?page=3; key fruits:page_1:items_10) 
            ** si la busqueda es por id (/fruits?id=151) se crea o accesa cache por id (key fruit:id:40)
            *** las otra busquedas por query parameters se mantienen
            **** si no hay path parameters retorna todos las frutas de la tabla y se cachean en la key fruits:all

        iii. update_fruits(id_value)
            * actualiza atributos de alguna fruta
            ** invalida el cache especifico de ese id
            *** invalida el cache de la pagina donde se encuentra ese id
            **** invalida la key fruits:all

        iv. delete_fruit(id_value)
            * elimina una fruta por id
            ** elimina todas las páginas de cache, esto es porque el valor del id puede estar en cualquier página y descuadraría los datos de las demás páginas
            *** elimina el cache individual específco por id
            **** invalida la key fruits:all

5. En api_buying, se aplicó la misma lógica de show_fruits() para la busqueda y cacheo de frutas y en los endpoints donde hubo updating de la cantidad de una fruta se aplicó la invalidación de los diferentes tipos de cache.

6. En api_cart_invoice en los end_points donde hay actualizaciones donde este implicado la cantidad de una fruta se aplica la invalidación de los diferentes tipos de cache. 

7. Con respecto al TTL en el módulo cache_manager en el método id_caching modifique a la hora de cachear data individual:
            
            de:
            # set cache for no limited time
            self.set_data(cache_key, json.dumps(formatted_fruit))
            a:
            # caching for ten minutes
            self.set_data(cache_key, json.dumps(formatted_fruit), 600)

    Estas son algunas de las razones por las cuales es bueno utilizar TTL:
        + Reduce la carga del servidor; el TTL permite servir contenido cacheado rápidamente sin consultar continuamente la base de datos, mejora la respuesta y disminuye la carga del backend.

        + TTLs de diferente duración se pueden ajustar según la naturaleza del tipo de dato (largo para datos poco cambiantes y más corto para datos que cambian frecuentemente) para balancear rapidez y precisión.

        + Un mejor manejo de recursos al expirar automáticamente la cache libera espacio de memoria y evita saturación con datos caducados o poco utilizados.

        + El TTL también mejora la seguridad y estabilidad ante ataques de denegación de servicio (DDoS) o fallas, al evitar consultas masivas al backend.

    En resumen, TTL ayuda a que el cache para un producto individual sea eficiente, actualizado y ayude a escalar la aplicación optimizando recursos y la experiencia de usuario.

8. Con respecto a get_invoices y get_users investigue si realmente vale la pena tener CACHE para este tipo de busquedas y encontré que de manera general que para este tipo de endpoints se reciben pocas solicitudes y el overhead de gestionar caching no justifica el beneficio. 

