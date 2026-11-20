## 1. Rutinas sin propia instancia

Las rutinas ahora tienen su propio almacén: `routineStore` en `store/stores.ts`.

- Cada rutina guarda el `memberId` de su dueño y el miembro ya no tiene el campo `routine`. Así la rutina vive en un solo lugar.
- Al crear un miembro se crea también su rutina vacía, para que cada miembro tenga siempre una.
- Para obtener la rutina de un miembro se usa `findMemberRoutine`.
- Los cambios a la rutina se hacen con actualizaciones parciales, por ejemplo `routineStore.update(id, { name })`, en lugar de reemplazar el perfil completo del miembro.
- Las rutinas activas se cuentan directo en su almacén con `routineStore.findBy(isActiveRoutine)`, sin pasar por los miembros. Una rutina se considera activa si tiene al menos una sesión.

## 2. Copias superficiales en getAll y el snapshot

Se comprobó que sí pasaba: `memberStore.getAll()[0].fullName = 'X'` cambiaba el dato dentro del almacén sin pasar por `update` y sin avisar a React. Se corrigió en dos niveles:

- **En ejecución:** `add` y `update` congelan en profundidad cada entidad antes de guardarla con `deepFreeze`. Si alguien intenta modificarla, incluso en campos anidados como `membership.contract`, se lanza un `TypeError` y el almacén queda intacto.
- **En compilación:** `getAll`, `getById`, `findBy` y `getSnapshot` devuelven `Readonly<T>`, así TypeScript marca el error en el editor antes de ejecutar.

La única forma de cambiar una entidad ahora es con `update`.

## 3. Limpiar operaciones que no se usan en el provider WeeklyRoutineProvider

- Se quitaron `setWeeklyRoutineId`, `setStartDate` y `setOfficialEntries`, que ninguna página usaba.
- También se quitaron los valores `weeklyRoutineId` y `startDate`, que nadie leía.
- `setRoutineName` ahora recibe solo el nombre nuevo.
- El contexto ofrece solo lo que la app necesita y ya no hay forma de cambiar el id de una rutina.

## 4. Resumen corto por miembro en el overview

- Debajo de los conteos del overview hay un área nueva, **Members resume**, con una línea por miembro: nombre, días, minutos, kcal y un indicador de carga.
- El indicador sale de `getWeeklyLoad`, que usa los mismos límites de la recomendación (3 a 5 días y 150 a 300 minutos) y devuelve `'none' | 'low' | 'balanced' | 'high'`.
- Cada estado tiene su texto en un `Record`, así no se puede olvidar ninguno.
- La tarjeta completa con la recomendación larga sigue en Memberships.
