# CORRECCIONES

# 1. Falta la descripción textual por categoría

    - Se crea generateDescription.ts con la función generateExerciseDescription utilizada en GroupExercises.tsx.
    - Ahora cada RoutineType: cuenta con una descripción completa con el día, nombre, datos relevantes y un texto de descripción de acuerdo a su ExerciseType.
    - Como una mejora adicional y también en generateDescription.ts, se crea la función generateCategoryWeeklyResumeDescription para seguir haciendo un resúmen descriptivo de todos los ejercicios por categoría de ejercicio.

# 2. El contador de ejercicios por tipo no funciona como pieza independiente

    - Se crea la función exerciseCounter en calculations.ts para centralizar el conteo de ejercicios sin depender de los componentes que muestran el detalle de cada rutina.
    - La función calcula de forma independiente el total de ejercicios y la cantidad correspondiente a cada categoría: Cardio, Strength y Flexibility.
    - Se utiliza exerciseCounter en WeeklySummary.tsx para mostrar el resumen numérico por categoría sin necesidad de listar todos los detalles de los ejercicios. NOTA: Se mantiene la descripción por categoría como información extra.
    - Se elimina exerciseCount del contexto y de las props de WeeklySummary.tsx, evitando mantener una segunda lógica para calcular el total de ejercicios.

# 3. Los tres componentes de resumen por categoría están casi duplicados

    - Se eliminó la duplicación de código reemplazando los componentes individuales (GroupCardio.tsx, GroupStrenght.tsx y GroupFlexibility.tsx) mediante una arquitectura modular en GroupCategory/.
    - Se creó el submódulo parametrizado GroupExercises.tsx, encargado de renderizar de manera reutilizable tanto los campos comunes (Duration, Calories) como los campos específicos de cada categoría (Cardio, Strength, Flexibility) a partir de las propiedades del ejercicio.
    - Se centralizó el agrupamiento en GroupCategories.tsx (GroupExercisesResume), el cual filtra las rutinas por categoría, maneja las cabeceras/secciones descriptivas y delega el renderizado de los ítems a GroupExercises.tsx.
    - NOTA: también se modulariza el Weekly Summary y también el Profile de usuario para mantener el código más limpio y ordenado.

# 4. La key de las listas ignora el id único que ya existe

    - Se reemplaza la key compuesta por el día, el nombre del ejercicio y el índice en GroupExercises.tsx.
    - Ahora cada elemento de la lista utiliza entry.id como key, aprovechando el RoutineId único que ya existe en cada RoutineType.
    - También se elimina el parámetro index del map(), ya que deja de ser necesario para identificar los elementos.
    - De esta forma, React utiliza una identidad estable para cada rutina, incluso si las entradas se reordenan, se filtran o existen ejercicios con el mismo nombre.

# 5. La construcción del objeto Exercise vive dentro del componente de página

    - Se extrae de ExerciseRoutine.tsx la lógica encargada de construir el objeto ExerciseType según la categoría seleccionada.
    - La nueva utilidad centraliza la generación del ExerciseId, los campos específicos de Cardio, Strength y Flexibility, y los cálculos de calorías y ritmo.
    - ExerciseRoutine.tsx conserva la responsabilidad de manejar el formulario y actualizar el contexto, delegando la construcción del ejercicio a una función pura en utils/.
    - De esta forma, la lógica de dominio queda separada de la interfaz y puede probarse de forma aislada.

# 6. Los archivos de contexto exportan provider y hook desde el mismo archivo

    - Se separan las responsabilidades de UserProfileContext.tsx y WeeklyRoutineContext.tsx para evitar que exporten componentes y hooks desde el mismo módulo. NOTA: como ya no contienen componentes ahora son UserProfileContext.ts y WeeklyRoutineContext.ts (módulos .ts)
    - Cada archivo de contexto se encarga únicamente de crear y exportar su contexto y su tipo correspondiente.
    - Los providers se trasladan a UserProfileProvider.tsx y WeeklyRoutineProvider.tsx, mientras que los hooks useUserProfile y useWeeklyRoutine se mantienen en la carpeta hooks/.
    - Esta separación corrige el error react-refresh/only-export-components reportado por npm run lint y mantiene una estructura más clara y ordenada para consumir cada contexto.
