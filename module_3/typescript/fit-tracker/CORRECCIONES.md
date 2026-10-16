# CORRECCIONES

## 1. Contratos formales para las funciones de cálculo.

- Se creó [`src/types/calculationTypes.ts`](src/types/calculationTypes.ts) con un tipo por cada función de cálculo (por ejemplo, `CaloriesBurned`, `ExerciseCounter`) y con los tipos de resultado `ExerciseCounts` y `CategoryTimes`.

- En [`src/utils/calculations.ts`](src/utils/calculations.ts) cada función ahora se declara como `const nombre: Contrato = (...) => {...}`. La lógica no cambió.

- El contrato existe aparte de la implementación. Si cambia uno de los dos y deja de coincidir, TypeScript marca el error.

## 2. Interfaces con nombre para los resultados de `exerciseCounter` y `totalTimeByCategory`.

- En [`src/types/calculationTypes.ts`](src/types/calculationTypes.ts) las formas de retorno se definieron como `interface`: `ExerciseCounts` (`total`, `cardio`, `strength`, `flexibility`) y `CategoryTimes` (`cardioTime`, `strengthTime`, `flexibilityTime`).

- Los contratos `ExerciseCounter` y `TotalTimeByCategory` las usan como tipo de retorno, así ya no hay formas escritas en la firma.

- La forma de los resultados queda definida en un solo lugar y puede reutilizarse.

## 3. `interface` para tipos de objeto, `type` solo para uniones y alias.

- Se cambiaron a `interface` los tipos de formulario (`DailyRoutineFormType`, `UserProfileFormType`, `InstructorProfileFormType`, `WeeklyRoutineNameFormType`) y los `Props` de formularios y providers.

- Se mantiene `type` en uniones de literales, tipos función, IDs con marca y alias puntuales como `NewInstructorType` (`Omit<...>`).

## 4. El perfil del miembro incluye su membresía y rutina asignada.

- `MemberProfileType` ahora contiene `membership: MembershipType` y `routine: WeeklyRoutineType`. La membresía queda modelada como algo que el miembro tiene, y la rutina asignada forma parte de su perfil.

- Se eliminó `MemberRoutineRecordType`, que duplicaba la relación entre el miembro y su rutina. El contexto y el provider ahora manejan directamente perfiles (`MemberProfileType`).

- Se actualizaron los formularios, resúmenes y vistas de instructores para acceder a los datos desde el perfil. Al editar un perfil se preservan la rutina existente y los datos de la membresía que no se modifican en el formulario.

## 5. Marcado de `complete` para un ejercicio después de creados.

- Ahora un ejercicio puede ser tanto marcado como `completed` o `incompleted` tanto en su creación (`DailyRoutineForm`) como en su revisión (`ListedRoutines`).

- Se creó `src/utils/setExerciseCompleted.ts` que recibe la rutina, el id de la sesión, el id del ejercicio y el nuevo estado, y retorna una copia actualizada de la rutina sin mutar la original.

- `WeeklyRoutineContext` y `WeeklyRoutineProvider` exponen `updateExerciseCompleted`, que guarda la copia en la rutina del miembro activo.

- En `ListedRoutines` el estado dejó de ser solo texto: ahora es un checkbox (`Completed` / `Incomplete`) que llama a `onToggleCompleted`. `UserRoutine` conecta esa prop con el contexto.

## 6. Edición y borrado de las notas del día (`dayComments`).

- Antes la nota de la sesión solo se agregaba al registrar un ejercicio y, por `dayComments || session.dayComments` en `UserRoutine`, una nota existente no se podía editar ni borrar.

- Se creó `src/utils/setDayComments.ts`, que recibe la rutina, el id de la sesión y el nuevo texto, y retorna una copia actualizada sin mutar la original. Un texto vacío (o solo espacios) elimina la nota.

- `WeeklyRoutineContext` y `WeeklyRoutineProvider` exponen `updateDayComments`.

- En `ListedRoutines` la nota es un `textarea` editable que guarda en `onBlur` solo si el texto cambió, mediante `onChangeDayComments`. `UserRoutine` conecta esa prop con el contexto.

- El formulario sigue pudiendo definir la nota al registrar un ejercicio; si queda vacío se conserva la existente.

## 7. Recomendaciones adecuadas.

- Antes `generateRecommendations` evaluaba `días || minutos` en una cadena `if / else if`: un usuario con 6 días y 140 minutos caía en "sé más constante" y nunca recibía el aviso de entrenar demasiados días, y uno con 2 días y 400 minutos cumplía ambas condiciones a la vez sin que el mensaje lo reflejara.

- En src/utils/generateRecommendations.ts ahora se clasifican por separado los días (`fewDays` < 3, `manyDays` > 5) y los minutos (`fewMinutes` < 150, `manyMinutes` > 300), y se combinan con `&&` para cubrir las 9 combinaciones posibles (pocos / normales / muchos × pocos / normales / muchos).

- Cada combinación tiene su propio mensaje con los valores reales del usuario. Por ejemplo, pocos días con muchos minutos advierte que se sobrecarga el cuerpo en esos días y sugiere repartir el entrenamiento.

- Cada `if` termina en `return`, por lo que el orden importa: las combinaciones (`fewDays && manyMinutes`) se evalúan antes que los casos individuales (`fewDays`) para que no queden ocultas.

## 8. Filtración de los ejercicios incompletos.

- Antes `totalIncompleteExercises` solo devolvía un número, así que `IncompleteRoutines` mostraba cuántos ejercicios faltaban pero no cuáles ni de qué día.

- En `src/types/calculationTypes.ts` se agregaron la interfaz `IncompleteExerciseEntry` (`id`, `name`, `day`) y el contrato `IncompleteExercisesList`.

- En `src/utils/calculations.ts` se creó `incompleteExercisesList`, que recorre todas las sesiones, filtra los ejercicios con `completed === false` y los devuelve junto con el día de su sesión. `totalIncompleteExercises` se mantiene sin cambios para los resúmenes que solo necesitan el conteo.

- En src/components/Observations/IncompleteRoutines.tsx se muestra la lista completa de pendientes con el formato "Running on Monday", debajo del total y antes del consejo.
