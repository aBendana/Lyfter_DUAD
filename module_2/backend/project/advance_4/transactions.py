from flask import jsonify
from repository_products import ProductsRepository
from repository_products_in_cart import ProductsInCartRepository
from decimal import Decimal

products_repo = ProductsRepository()
products_in_cart_repo = ProductsInCartRepository()


class Transactions:
    def __init__(self):
        pass

    def update_take_from_stock(self, product_id, quantity_purchased):
        product = products_repo.get_product_by_value("id", product_id)
        new_stock_total = product[0]["stock"] - quantity_purchased
        if new_stock_total < 0:
            raise ValueError("Not enough product in stock")
        products_repo.update_product("id", product_id, "stock", new_stock_total)


    def update_add_to_stock(self, product_id, quantity_returned):
        product = products_repo.get_product_by_value("id", product_id)
        new_stock_total = product[0]["stock"] + quantity_returned
        products_repo.update_product("id", product_id, "stock", new_stock_total)


    def stock_logic(self, current_quantity, new_quantity, product_id, product_in_cart):
        # calculate the difference to update stock
        if new_quantity < 0:
            raise ValueError("Quantity cannot be negative")
        
        elif new_quantity == current_quantity:
            return jsonify(message="Quantity is the same, no update needed"), 200
        
        elif new_quantity > current_quantity:
            quantity_difference = new_quantity - current_quantity
            self.update_take_from_stock(product_id, quantity_difference)
        
        elif new_quantity < current_quantity:
            quantity_difference = current_quantity - new_quantity
            self.update_add_to_stock(product_id, quantity_difference)
        
        elif new_quantity == 0:
            self.update_add_to_stock(product_id, current_quantity)
            # delete the product from cart
            products_in_cart_repo.delete_product_in_cart("id", product_in_cart[0]["id"])
            return jsonify(message="Product removed from cart"), 200


    def calculate_item_total(self, item):
        product = products_repo.get_product_by_value("id", item["product_id"])
        item_total = item["quantity"] * (product[0]["price"])
        return item_total
    

    def calculate_item_total_for_update_detail(self, item):
        product = products_repo.get_product_by_value("id", item[0]["product_id"])
        item_total = item[0]["quantity"] * (product[0]["price"])
        return item_total
    
    
    def calculate_invoice_subtotal(self, products_in_cart):
        invoice_subtotal = 0
        for item in products_in_cart:
            item_total = self.calculate_item_total(item,)
            invoice_subtotal += item_total
        return invoice_subtotal
    

    def calculate_discount(self, subtotal, discount):
        if discount < 0 or discount > 100:
            raise ValueError("Invalid discount rate")
        discount_amount = Decimal(discount / 100) * subtotal
        return discount_amount
    

    def calculate_shipping_cost(self, shipping_method):
        if shipping_method == "standard":
            return 5.00
        elif shipping_method == "express":
            return 15.00
        elif shipping_method == "overnight":
            return 25.00
        else:
            raise ValueError("Invalid shipping method")
        

    def calculate_invoice_total(self, subtotal, discount_amount, shipping_cost):
        taxes = Decimal(0.07) * (subtotal - Decimal(discount_amount) + Decimal(shipping_cost))  # fixed tax rate of 7%
        invoice_total = subtotal - Decimal(discount_amount) + Decimal(shipping_cost) + taxes
        return invoice_total