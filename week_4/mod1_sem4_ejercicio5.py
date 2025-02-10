#Andrés Bendaña
#Módulo 1, Semana 4, Ejercicio 5

cantidad_notas_aprobadas = 0
cantidad_notas_desaprobadas = 0
promedio_notas_aprobadas = 0
promedio_notas_desaprobadas = 0
promedio_notas_total = 0

total_notas = int(input("Ingrese la cantidad total de notas: "))

contador_notas = 1
while (contador_notas <= total_notas):
    nota_actual = int(input(f"Ingrese la nota número {contador_notas}: "))

    if (nota_actual < 70):
        cantidad_notas_desaprobadas = cantidad_notas_desaprobadas + 1
        promedio_notas_desaprobadas = promedio_notas_desaprobadas + nota_actual

    else:
        cantidad_notas_aprobadas = cantidad_notas_aprobadas + 1
        promedio_notas_aprobadas = promedio_notas_aprobadas + nota_actual

    promedio_notas_total = promedio_notas_total + (nota_actual / total_notas)

    contador_notas = contador_notas + 1

promedio_notas_desaprobadas = promedio_notas_desaprobadas / cantidad_notas_desaprobadas
promedio_notas_aprobadas = promedio_notas_aprobadas / cantidad_notas_aprobadas

print("")
print(f"El estudiante tiene {cantidad_notas_desaprobadas} notas desaprobadas, que promedian {promedio_notas_desaprobadas}")
print("")
print(f"El estudiante tiene {cantidad_notas_aprobadas} notas aprobadas, que promedian {promedio_notas_aprobadas}")
print("")
print(f"El promedio del total de notas es de {promedio_notas_total}")