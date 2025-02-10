#Andrés Bendaña
#Módulo 1, Semana 5, Ejercicios de Diccionario EXTRA

print("EJERCICIO DICCIONARIOS EXTRA")

sales = [
	{
		'date': '27/02/23',
		'customer_email': 'joe@gmail.com',
		'items': [
			{
				'name': 'Lava Lamp',
				'upc': 'ITEM-453',
				'unit_price': 65.76,
			},
			{
				'name': 'Iron',
				'upc': 'ITEM-324',
				'unit_price': 32.45,
			},
			{
				'name': 'Basketball',
				'upc': 'ITEM-432',
				'unit_price': 12.54,
			},
		],
	},
	{
		'date': '27/02/23',
		'customer_email': 'david@gmail.com',
		'items': [
			{
				'name': 'Lava Lamp',
				'upc': 'ITEM-453',
				'unit_price': 65.76,
			},
			{
				'name': 'Key Holder',
				'upc': 'ITEM-23',
				'unit_price': 5.42,
			},
		],
	},
	{
		'date': '26/02/23',
		'customer_email': 'amanda@gmail.com',
		'items': [
			{
				'name': 'Key Holder',
				'upc': 'ITEM-23',
				'unit_price': 3.42,
			},
			{
				'name': 'Basketball',
				'upc': 'ITEM-432',
				'unit_price': 17.54,
			},
		],
	},
]

(dic_sales_1, dic_sales_2, dic_sales_3) = sales

for venta, detalle in dic_sales_1.items():
    if (venta == "items"):
        list_sales_1 = detalle
#print(list_sales_1)

for venta, detalle in dic_sales_2.items():
    if (venta == "items"):
        list_sales_2 = detalle
#print(list_sales_2)

for venta, detalle in dic_sales_3.items():
    if (venta == "items"):
        list_sales_3 = detalle
#print(list_sales_3)


"""
for index, item in enumerate(list_sales_1):
    print(item.values())
    (name, upc, unit_price) = item.values()
print(name, upc, unit_price)
"""
(dic_venta_1_1, dic_venta_1_2, dic_venta_1_3) = list_sales_1
(dic_venta_2_1, dic_venta_2_2) = list_sales_2
(dic_venta_3_1, dic_venta_3_2) = list_sales_3

total_item_453 = 0
total_item_324 = 0
total_item_432 = 0
total_item_23 = 0

for key, value in dic_venta_1_1.items():
    if (key == "upc"):
        if (value == "ITEM-453"):
            total_item_453 = total_item_453 + dic_venta_1_1["unit_price"]
        elif (value == "ITEM-324"): 
            total_item_324 = total_item_324 + dic_venta_1_1["unit_price"]
        elif (value == "ITEM-432"): 
            total_item_432 = total_item_432 + dic_venta_1_1["unit_price"]
        else:
            total_item_23 = total_item_23 + dic_venta_1_1["unit_price"]

for key, value in dic_venta_1_2.items():
    if (key == "upc"):
        if (value == "ITEM-453"):
            total_item_453 = total_item_453 + dic_venta_1_2["unit_price"]
        elif (value == "ITEM-324"): 
            total_item_324 = total_item_324 + dic_venta_1_2["unit_price"]
        elif (value == "ITEM-432"): 
            total_item_432 = total_item_432 + dic_venta_1_2["unit_price"]
        else:
            total_item_23 = total_item_23 + dic_venta_1_2["unit_price"]

for key, value in dic_venta_1_3.items():
    if (key == "upc"):
        if (value == "ITEM-453"):
            total_item_453 = total_item_453 + dic_venta_1_3["unit_price"]
        elif (value == "ITEM-324"): 
            total_item_324 = total_item_324 + dic_venta_1_3["unit_price"]
        elif (value == "ITEM-432"): 
            total_item_432 = total_item_432 + dic_venta_1_3["unit_price"]
        else:
            total_item_23 = total_item_23 + dic_venta_1_3["unit_price"]

for key, value in dic_venta_2_1.items():
    if (key == "upc"):
        if (value == "ITEM-453"):
            total_item_453 = total_item_453 + dic_venta_2_1["unit_price"]
        elif (value == "ITEM-324"): 
            total_item_324 = total_item_324 + dic_venta_2_1["unit_price"]
        elif (value == "ITEM-432"): 
            total_item_432 = total_item_432 + dic_venta_2_1["unit_price"]
        else:
            total_item_23 = total_item_23 + dic_venta_2_1["unit_price"]

for key, value in dic_venta_2_2.items():
    if (key == "upc"):
        if (value == "ITEM-453"):
            total_item_453 = total_item_453 + dic_venta_2_2["unit_price"]
        elif (value == "ITEM-324"): 
            total_item_324 = total_item_324 + dic_venta_2_2["unit_price"]
        elif (value == "ITEM-432"): 
            total_item_432 = total_item_432 + dic_venta_2_2["unit_price"]
        else:
            total_item_23 = total_item_23 + dic_venta_2_2["unit_price"]

for key, value in dic_venta_3_1.items():
    if (key == "upc"):
        if (value == "ITEM-453"):
            total_item_453 = total_item_453 + dic_venta_3_1["unit_price"]
        elif (value == "ITEM-324"): 
            total_item_324 = total_item_324 + dic_venta_3_1["unit_price"]
        elif (value == "ITEM-432"): 
            total_item_432 = total_item_432 + dic_venta_3_1["unit_price"]
        else:
            total_item_23 = total_item_23 + dic_venta_3_1["unit_price"]

for key, value in dic_venta_3_2.items():
    if (key == "upc"):
        if (value == "ITEM-453"):
            total_item_453 = total_item_453 + dic_venta_3_2["unit_price"]
        elif (value == "ITEM-324"): 
            total_item_324 = total_item_324 + dic_venta_3_2["unit_price"]
        elif (value == "ITEM-432"): 
            total_item_432 = total_item_432 + dic_venta_3_2["unit_price"]
        else:
            total_item_23 = total_item_23 + dic_venta_3_2["unit_price"]


print(f"Total de ventas en el artículo con upc ITEM-453: ${total_item_453}")
print(f"Total de ventas en el artículo con upc ITEM-324: ${total_item_324}")
print(f"Total de ventas en el artículo con upc ITEM-432: ${total_item_432}")
print(f"Total de ventas en el artículo con upc ITEM-23: ${total_item_23}")

dic_resumen = {
    "ITEM-453": total_item_453,
    "ITEM-324": total_item_324,
    "ITEM-432": total_item_432,
    "ITEM-23": total_item_23,
}

print("")
print(dic_resumen)




# Lista de ventas (cada venta contiene información de fecha, cliente e ítems vendidos)
sales = [
{
'date': '27/02/23',
'customer_email': 'joe@gmail.com',
'items': [
{'name': 'Lava Lamp', 'upc': 'ITEM-453', 'unit_price': 65.76},
{'name': 'Iron', 'upc': 'ITEM-324', 'unit_price': 32.45},
{'name': 'Basketball', 'upc': 'ITEM-432', 'unit_price': 12.54},
],
},
{
'date': '27/02/23',
'customer_email': 'david@gmail.com',
'items': [
{'name': 'Lava Lamp', 'upc': 'ITEM-453', 'unit_price': 65.76},
{'name': 'Key Holder', 'upc': 'ITEM-23', 'unit_price': 5.42},
],
},
{
'date': '26/02/23',
'customer_email': 'amanda@gmail.com',
'items': [
{'name': 'Key Holder', 'upc': 'ITEM-23', 'unit_price': 3.42},
{'name': 'Basketball', 'upc': 'ITEM-432', 'unit_price': 17.54},
],
},
]

# PASO 1: Inicializamos un diccionario vacío donde almacenaremos el total por cada UPC.
total_sales = {}

# PASO 2: Recorremos cada venta de la lista de ventas
for sale in sales:
# En cada venta, recorremos la lista de ítems
    for item in sale['items']:
# Obtenemos el UPC del producto y su precio
        upc = item['upc']
        price = item['unit_price']

# PASO 3: Acumulamos el precio en el diccionario
# Si el UPC ya está en el diccionario, sumamos el precio
        if upc in total_sales:
            total_sales[upc] += price
        else:
# Si el UPC no está en el diccionario, lo agregamos con su precio inicial   
            total_sales[upc] = price

# PASO 4: Mostramos el resultado final
print("Totales de ventas por UPC:")
for upc, total in total_sales.items():
    print(f"UPC {upc}: ${total:.2f}")




#list_sales_1 = dic_sales_1["items"]
#list_sales_2 = dic_sales_2["items"]
#list_sales_3 = dic_sales_3["items"]
#print(list_sales_1)
#print(list_sales_2)
#print(list_sales_3)

#for product in list_sales_1:

""""

    print(dics["items"][0]["unit_price"])
    print(dics["items"][1]["unit_price"])
    #print(dics["items"][2]["unit_price"])

for index, dics in enumerate(sales):

    dic_precio.append(sales[index]["items"][index-1]["unit_price"])
    dic_precio_1.append(dics["items"][index-1]["unit_price"])

print(dic_precio)
print(dic_precio_1)
#print(sales[2]["items"][0]["upc"])
#print(sales[2]["items"][0]["unit_price"])"""