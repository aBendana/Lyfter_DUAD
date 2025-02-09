#Andrés Bendaña
#Módulo 1, Semana 4, Ejercicio 1

un_string = "string" + " simple"
print(un_string)
print("")

numero_entero = 2 + 5
print(numero_entero)
print("")

numero_float = 2.5 + 2.8
print(numero_float)
print("")

entero_y_flotante = 2 + 2.2
print(entero_y_flotante)
print("")

primer_booleano = False + False
segundo_booleano = False + True
tercer_booleano = True + True
print(bool(primer_booleano), bool(segundo_booleano), bool(tercer_booleano))
print(f"{primer_booleano}, {segundo_booleano}, {tercer_booleano}")
print("")

una_lista = [1,2,3] + ["a","b","c"]
print(una_lista)
print("")

una_tupla = (False,True,False) + (1.1, 2.2, 3.3)
print(una_tupla)
print("")

#un_diccionario = {"llave_1":1, "llave_2":2, "llave_3":3} + {"key_1":4, "key_2":5, "llave_3":6}
#print(un_diccionario)
#no se pueden sumar diccionarios

"""
#    string_y_entero = "palabra" + 1
#    string_y_lista = "palabras" + [10,20,30]
#    string_y_booleano = "palabras", True
#    un_diccionario = {"llave_1":1, "llave_2":2.2, "llave_3":"tres"}, {"key_1":False, "key_2":[10,20,30], "llave_3":("dupla","dentro","en el diccionario")}

*no se puede adicionar string con un entero, ni con float ni con lista ni tupla ni booleano
**tampoco se puede adicionar nada entre diferentes tipos de variables; con excepción de int + float
"""

tupla_diccionario = {"llave_1":1, "llave_2":2.2, "llave_3":"tres"}, {"key_1":False, "key_2":[10,20,30], "llave_3":("tupla","con","diccionario")}
print(tupla_diccionario)
print("")

tupla_lista = [10,20,30], (40,50,60)
print(tupla_lista)

