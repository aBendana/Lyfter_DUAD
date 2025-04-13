#Andrés Bendaña
#Módulo 1, Semana 4, Ejercicios Extra 1
#Ejercicios de Semana 2


print("EJERCICIOS SEMANA 2")
print("")
print("EJERCICIO 1")

precio_producto = int(input("Ingrese el precio del producto: "))

if (precio_producto < 100):
    precio_final = precio_producto - (precio_producto * 0.02)
else:
    precio_final = precio_producto - (precio_producto * 0.1)

print(f"El precio final es de: {precio_final}")



print("")
print("")
print("")
print("EJERCICIO 2")

tiempo_diezminutos_segundos = 10 * 60
tiempo_segundos = int(input("Ingrese el tiempo en segundos: "))

if (tiempo_segundos < tiempo_diezminutos_segundos):
    tiempo_faltante = tiempo_diezminutos_segundos - tiempo_segundos
    print(f"El tiempo faltante es de {tiempo_faltante}")
elif (tiempo_segundos == tiempo_diezminutos_segundos):
    print("EL tiempo digitado es exactamente 10 minutos")
else:
    print("El tiempo es mayor!")   



print("")
print("")
print("")
print("EJERCICIO 3")

contador = 0
sumatoria = 0
numero = int(input("Ingrese el número para la sumatoria: "))

while (contador < numero):
    contador = contador + 1
    sumatoria = sumatoria + contador

print(f"El valor de la sumatoria es: {sumatoria}")



print("")
print("")
print("")
print("EJERCICIO EXTRA 1")

primer_numero = int(input("Ingrese el 1er número: "))
segundo_numero = int(input("Ingrese el 2nd número: "))

if (primer_numero > segundo_numero):
    primer_numero_ordenado = segundo_numero
    segundo_numero_ordenado = primer_numero
    print(f"Los números en orden: {primer_numero_ordenado}, {segundo_numero_ordenado}")

else:
    print(f"Los números en orden: {primer_numero}, {segundo_numero}")



print("")
print("")
print("")
print("EJERCICIO EXTRA 2")

factor_conversion = 1000 / (60*60)
velocidad_kmh = int(input("Ingrese la velocidad en Km/h: "))
velocidad_ms = velocidad_kmh * factor_conversion
print(f"La velocidad en m/s es de: {velocidad_ms}")



print("")
print("")
print("")
print("EJERCICIO EXTRA 3")

contador = 0
total_mujeres = 0
total_hombres = 0
total_usuarios = int(input("Ingrese el número total de usuarios: "))
print("Para cada usuario digite '1' para mujer y '2' para hombre")

while(contador < total_usuarios):
    usuario = int(input("Ingrese tipo de usuario: "))
    if(usuario == 1):
        total_mujeres = total_mujeres + 1
    else:
        total_hombres = total_hombres + 1
    
    contador = contador + 1

porcentaje_mujeres = (total_mujeres * 100) / total_usuarios
porcentaje_hombres = (total_hombres * 100) / total_usuarios
print(f"El porcentaje de mujeres es: {porcentaje_mujeres}")
print(f"El porcentaje de hombres es: {porcentaje_hombres}")

