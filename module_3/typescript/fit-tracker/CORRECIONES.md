### Corrección 1: Reporte Unificado

**Ejercicios incompletos:** `ExerciseCatalogProvider` guarda los que no pasan la validación (`incompleteExercises`), sin perderlos entre búsquedas. En `NinjaExercises` se listan marcados como **(incomplete)**, con su motivo y dos opciones: **Add to catalog** (se completan y pasan por el mismo validador) o **Discard**.

**`generateUnifiedReport`** (`src/utils`): función pura que combina ejercicios locales y de la API, agrupados por categoría, con el total de ejercicios y minutos. Usa una unión discriminada: `logged` (registrado en la rutina) o `not-logged` (de la API, sin registrar). Los incompletos quedan aparte.

**Volumen** (`exerciseVolume`): `sets × repetitions × weight`, o `sets × repetitions` si no hay peso. El peso se unificó en **lbs**.

**Página "Unified Report"** (`/unified-report`): totales generales, una sección por categoría con su dato específico (ritmo, volumen, posiciones) y una sección aparte **Incomplete Ninja Exercises** con los ejercicios que no pasaron la validación.

### Correción 2: Restricciones as

**`fetchExercisesByMuscle.ts`:** se quitó `(await response.json()) as unknown`. Como `response.json()` devuelve `any`, se asigna directamente a una variable `unknown` (`const data: unknown = await response.json()`), sin conversión. La respuesta sigue pasando por `validateApiExercises`.

**`createRoutineEntry.ts`:** se quitó `'ninja' as const`. Ahora la función constructora `createExerciseSource(fromNinja)` declara su tipo de retorno (`Pick<ExerciseGenericType, 'source'>`), y con eso TypeScript conserva el literal `'ninja'` sin conversión.

**`generateIds.ts`:** se quitó `crypto.randomUUID() as ExerciseId` (y los otros 4 IDs). En `typeGuards.ts` hay un type guard por tipo de ID (`isExerciseId`, `isMemberId`, etc.) que valida el formato UUID. Cada generador valida el UUID antes de devolverlo, así que el tipo se obtiene por validación y no por conversión.

**`WeeklyRoutineProvider.tsx`:** se quitó `action as (previousValue: Value) => Value`. El type guard `isStateUpdater` (en `typeGuards.ts`) distingue si la acción es una función que actualiza el valor anterior o el valor nuevo directamente, sin conversión.

**`App.tsx`:** se cambió `import { BrowserRouter as Router }` por `BrowserRouter`. Aunque solo renombraba el import y no convertía tipos, así el proyecto no tiene ningún `as`.

### Correción 3: Campos 'mínimos requeridos'

**`validateApiExercises.ts`:** la decisión quedó explícita en un comentario del validador. Un ejercicio de la API es completo solo si trae los campos que FitTracker necesita:

- `name`: identifica el ejercicio en el catálogo y en la rutina.
- `type`: define la categoría (Cardio, Strength, Flexibility).
- `muscle`: indica qué trabaja el ejercicio; debe ser un músculo de `apiMuscles`.
- `difficulty`: permite ver si encaja con el nivel del miembro; debe ser `beginner`, `intermediate` o `expert`.
- `equipments`: lista de lo que se necesita para hacerlo; debe traer al menos un elemento de texto (la API no tiene valores fijos).

`instructions` y `safety_info` son opcionales: no se exigen ni se guardan. Si falta un campo obligatorio, el ejercicio se marca como **(incomplete)** con el motivo.

**Ejercicios incompletos (Ninja Exercises):** el usuario decide: **Add** lo agrega al catálogo con "Not Specified" en lo que falte (se guarda como `null`), o **Discard** lo descarta. Sin `name` o `type` solo se puede descartar. Los agregados siguen en la lista como **In catalog**, igual que los completos.

**Reporte unificado:** las tablas muestran **Muscle**, **Difficulty** y **Equipment** ("—" en los locales). Los incompletos van en su propia tabla, **Ninja Exercises (Incomplete Info)**, con las mismas columnas. No aparecen en las categorías, pero sus minutos **sí cuentan en los totales generales**, porque el ejercicio se hizo; solo le falta información.

### Correción 4: lógica duplicada en `hasExercise` y `addExercise`

**`ExerciseCatalogProvider.tsx`:** la comparación "ya existe en los ejercicios por defecto o en los agregados" estaba copiada en `hasExercise` y dentro del `setAddedExercises` de `addExercise`. Ahora vive en una sola función pura, `isInCatalog(addedExercises, category, name)`, que recibe la lista como parámetro:

- `hasExercise` la usa con el estado actual.
- `addExercise` la usa dentro del updater con la lista más reciente, así dos clics rápidos no duplican el ejercicio. Se quitó la comprobación previa con `hasExercise`, que era la segunda copia.

**Extra, mensaje del formulario de rutina:** `DailyRoutineForm` mostraba "Routine saved successfully!" sin saber si el ejercicio se había guardado. Ahora `onSubmit` devuelve `boolean` (`handleEntrySubmit` en `UserRoutine.tsx` responde `true` si lo guardó y `false` si lo rechazó): con `true` muestra el éxito y limpia el formulario; con `false` muestra un mensaje de error y conserva los datos para corregirlos.

### Corrección 5: `SportNameType` abierto a cualquier texto

**`exerciseTypes.ts`:** `SportNameType` era `string`, aunque el comentario decía "union type of all sports". Ahora no acepta cualquier texto:

- `LocalExerciseNameType`: unión de los nombres locales (lista cerrada de literales).
- `ApiExerciseNameType`: `string` con brand; solo se obtiene con el type guard `isApiExerciseName`, que usa el validador al leer la API.
- `SportNameType = LocalExerciseNameType | ApiExerciseNameType`, con el comentario corregido para reflejar esta decisión.

Así el catálogo puede crecer con ejercicios de la API sin volver a abrir el tipo a `string`. `getExerciseNames` devuelve `SportNameType[]`, y como el `<select>` del formulario envía texto, `UserRoutine.tsx` confirma con el guard `isCatalogExerciseName` que el nombre existe en el catálogo de esa categoría antes de guardarlo.

### Corrección 6: saltos de líneas en `generateDescriptions.ts`

**`generateDescriptions.ts`:** los template strings ocupaban varias líneas, así que el texto llegaba a la UI con `\n` y la sangría del código (por ejemplo `heart rate zone \n      3`). Ahora cada parte de la frase es un template string de una sola línea, unidas con `+`: el código se sigue leyendo en varias líneas, pero el texto sale limpio (`heart rate zone 3`).

**Extra:** en los mismos textos se corrigió "3 sets of 10" → "3 sets of 10 repetitions", "not specified lbs" → "not specified" cuando no hay peso, y el singular/plural de "exercise".

### Corrección 7: quitar `formatMuscleLabel` y reutilizar `formatFilterLabel`

**`normalizeExercise.ts`:** `formatMuscleLabel` usaba `replace('_', ' ')`, que solo cambia la primera coincidencia (`"upper_lower_back"` quedaría `"Upper lower_back"`). Se eliminó y ahora todos los usos (opciones y filtros en `NinjaExercises`, resultados de búsqueda y la columna **Muscle** del reporte unificado) reutilizan `formatFilterLabel`, que separa en cada `_` o espacio. Así los músculos se muestran igual que tipos, dificultades y equipo (`"lower_back"` → `"Lower Back"`).

### Bonus: componente `SearchHistory`

**Historial de búsquedas de la sesión** en **Ninja Exercises**, debajo del formulario (**Recent searches**):

- Cada búsqueda exitosa se guarda como `SearchHistoryEntryType`: los filtros que ya tenía `SearchState`, la hora y cuántos ejercicios válidos e incompletos trajo. Los errores no se guardan.
- Se guarda en `ExerciseCatalogProvider` (`searchHistory`, `addSearchToHistory`, `clearSearchHistory`), en memoria como el catálogo: se mantiene al navegar y se borra al recargar. Máximo 10, la más reciente primero y sin filtros repetidos.
- `SearchHistory` es un componente de presentación: recibe el historial por props y solo avisa los clics. **Search again** llena el formulario y busca con la misma función `runSearch` que usa el formulario; **Clear** vacía el historial.
- `formatSearchFilters` arma el texto de los filtros y se reutiliza en el historial y en el encabezado de los resultados.

**Formulario de búsqueda como módulo independiente:** el form estaba escrito dentro de `NinjaExercises.tsx`. Ahora es `components/Forms/NinjaSearchForm`, igual que los demás formularios de la app. Es un formulario controlado: la página guarda los valores (`formValues`) y el form solo los muestra y avisa los cambios (`onChange`, `onSearch`). Así **Search again** lo llena con `toFormValues(filters)`. La lista de tipos y su guard pasaron a `exerciseCatalog.ts` y `typeGuards.ts`.
