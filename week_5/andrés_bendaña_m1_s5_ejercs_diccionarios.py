#Andrés Bendaña
#Módulo 1, Semana 5, Ejercicios de Diccionarios


print("EJERCICIO 1")

hotel_info = {
        "nombre": "El Valle hotel",
        "estrellas": 5,
        "habitaciones": [
                    {"numero": 1, "piso": 1, "precio_por_noche": 150},
                    {"numero": 2, "piso": 1, "precio_por_noche": 150},
                    {"numero": 3, "piso": 1, "precio_por_noche": 150},
                    {"numero": 4, "piso": 1, "precio_por_noche": 150},
                    {"numero": 5, "piso": 1, "precio_por_noche": 250},
                    {"numero": 6, "piso": 2, "precio_por_noche": 200},
                    {"numero": 7, "piso": 2, "precio_por_noche": 200},
                    {"numero": 8, "piso": 2, "precio_por_noche": 200},
                    {"numero": 9, "piso": 2, "precio_por_noche": 200},
                    {"numero": 10, "piso": 2, "precio_por_noche": 200},
                    {"numero": 11, "piso": 3, "precio_por_noche": 300},
                    {"numero": 12, "piso": 4, "precio_por_noche": 300}, ]
}

#imprimir el precio de la habitación doce
print(f"El precio de la habitación # 12 es de: ${hotel_info["habitaciones"][11]["precio_por_noche"]}")



print("")
print("")
print("")
print("EJERCICIO 2")

list_keys = ["first_name", "last_name", "age", "email"]
list_values = ["Andrés", "Bendaña", 43, "a.bendana.81@gmail.com"]
dic_personal_info = {}

for index in range(0,len(list_keys)):
    dic_personal_info[list_keys[index]] = list_values[index]
    
print(dic_personal_info)



print("")
print("")
print("")
print("EJERCICIO 3")

dic_auto= {
    "marca": "Honda",
    "modelo": "CRV",
    "año": 2026,
    "kilometraje": 0,
    "extras": "Asientos de cuero"
}
print(f"Información del automóvil: {dic_auto}")

list_llaves = []
for index, caracteristicas in enumerate(dic_auto.keys()):
    list_llaves.insert(index, caracteristicas)
print(f"Lista de características: {list_llaves}")

llave_a_eliminar = input(f"De la descripción del automóvil, escriba que caracteristica desea eliminar: ")
dic_auto.pop(llave_a_eliminar)
print(f"Características finales {dic_auto}")
