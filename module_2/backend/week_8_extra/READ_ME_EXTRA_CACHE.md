Anotaciones del ejercicio semana 8 EXTRA; en general el código se mantiene con respecto al ejercicio de la semana 8 con modificaciones en los siguientes puntos:

1. Endpoint show_fruits para el cacheo individual de una fruta se le agrego el parámetro ttl=600 (time to live 600 segundos equivalente a 10 minutos). **Funciona cuando se hace una busqueda por la columna "id"

Entre las ventajas de usar TTL están:
    + Cuando el cachce expira se elimina y cuando se vuelva a cargar será con los últimos datos de la DB, evitando mostrar información obsoleta. Por ejemplo si actulizamos la cantidad de un producto, posiblemente no habrá necesidad de eliminar el cache de ese producto, puesto que su TTL ya habrá terminado.

    + Reduce la carga del servidor; el TTL permite servir contenido cacheado rápidamente sin consultar continuamente la base de datos, mejora la respuesta y disminuye la carga del backend.

    + TTLs de diferente duración se pueden ajustar según la naturaleza del tipo de dato (largo para datos poco cambiantes y más corto para datos que cambian frecuentemente) para balancear rapidez y precisión.

    + Un mejor manejo de recursos al expirar automáticamente la cache libera espacio de memoria y evita saturación con datos caducados o poco utilizados.

    + El TTL también mejora la seguridad y estabilidad ante ataques de denegación de servicio (DDoS) o fallas, al evitar consultas masivas al backend.

En resumen, TTL ayuda a que el cache para un producto individual sea eficiente, actualizado y ayude a escalar la aplicación optimizando recursos y la experiencia de usuario.


2. Para el cache de listado completo: 
    a) Se agregó en el módulo cache_manager: generate_all_cache_key que genera el patrón de llave que guardara la consulta de todas las frutas y cache_all_key que crea cache de todo el listado de frutas
    b) En los endpoints donde se crea, modifica o borra una fruta se elimina todo la llave que contiene todo el listado de las frutas por medio de delete_data_with_pattern(pattern) en este caso pattern es "fruits:all"


3. Con respecto al punto 3. del ejercicio extra; el consultar primero que la data este en cache y sino cachearla a Redis, esto fue aplicado incluso en el ejercicio anterior (ejercicio semana 8) por ejemplo:
            
            if column and filter_value:
                if column == "id":
                    # verifying cache in Redis
                    cache_key, cached_data = cache_manager.cache_single_key("fruit", column, filter_value)
                    if cached_data:
                        return Response(cached_data, status=200, mimetype='application/json')
                    else:
                        #caching a single key
                        formatted_fruit = fruits_repo.get_fruit_by_value(column, filter_value)
                        cache_manager.set_data(cache_key, json.dumps(formatted_fruit), 600)
                        return Response(json.dumps(formatted_fruit), status=200, mimetype='application/json')


4. Otras mejoras que se le hizo al api_fruits fue eliminar los endpoints, update_many_fruits, create_many_fruits y el móduo api_admin que era un módulo modelo también fue eliminado. La idea es no entorpecer el funcionamiento de la creación de cache especialmente con el cache de empaginación.