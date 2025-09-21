from flask import Flask
from api_login import logins_bp
from api_admin_users import admin_users_bp
from api_products import products_bp
from api_client_info import client_info_bp
from api_cart import cart_bp
from api_invoice import invoice_bp

#from api_users_contacts import users_contacts_bp

app = Flask(__name__)

#  registering the blueprints
#app.register_blueprint(name_bp, url_prefix='/*/**')
app.register_blueprint(logins_bp)
app.register_blueprint(admin_users_bp)
app.register_blueprint(products_bp)
app.register_blueprint(client_info_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(invoice_bp)
#app.register_blueprint(users_contacts_bp)


@app.route("/")
def root():
    return "<h1>Welcome to Lyfter Ecommerce Pet Shop!</h1>"


if __name__ == '__main__':
    app.run(debug=True)
