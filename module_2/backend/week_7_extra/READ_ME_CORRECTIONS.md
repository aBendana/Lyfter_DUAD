1. Modificación de la lógica de contacts en repository_contacts:
    a) se quitaron las diferensaciones de roles en los métodos.
    b) se dejan los métodos que sean útiles para ambos roles 'administrators' y 'cb_users' (con excepción de los métodos de busqueda).
    c) para las busquedas se crearon admin_show_contacts, cb_user_show_contacts, admin_get_contact_by value y cb_user_get_contact_by_value, la forma de seleccionar los contactos para cada método es diferente principalmente porque no queremos que en el select del cb_user de resultados equivocados de otros users.

2. Cree dos apis solo para administradores para tener un panel de manejo general de 'users' o 'contacts' así un 'administrator' puede aplicar CRUD a cualquuer 'user' o 'contact'.

3. También cree un api_users_contacts donde tanto los 'administrators' como los 'cb_users' pueden utilizar los endpoints, osea un 'administrator' puede disfrutar de la experiencia de ser un user mas, tener sus propios contactos y administrarlos desde este módulo. En todo caso si hubiese que cambiar esto a que solo 'cb_users' pueden usar este api, se cambiaría de nuevo del decorador 'users_only' a 'cb_users_only'.

4. Corrección para los 'updates' y 'deletes' de 'users' y 'contacts': 
    a) la busqueda solo se puede hacer por medio del 'id' ya sea de 'users' o 'contacts'. 
    b) la validación para que los 'users' solo puedan modificar o borrar sus propios contactos sea hace por medio de validación de doble factor, utilizando tanto el user_id generado en el login como el id del contacto que quiere ser actulizado o borrado. En el caso que el 'id' brindado no pertenezca al usuario en sesión devolvera un mensaje de error. 
    c) La validación de la columna 'id' se hace por medio del método valid_columns(column, valid_columns) en estos casos valid_columns es solo ["id"]

5. De manera general los apis se manejan con los repositorios los cuáles a su vez llaman 'orms_queries' y 'validations' (nota: estos dos módulos son los que manejan mayormente los errores generales y errores personalizados); con esto logré reducir la lógica que antes aplicaba en los endpoints (inicios del módulo 2 backend).