from flask import Flask
from api_login import logins_bp
from api_buying import buying_bp
from api_admin import admin_bp
from api_fruits import fruits_bp
from api_users import users_bp
from api_cart_invoice import cart_invoice_bp


app = Flask(__name__)

#  registering the blueprints
#app.register_blueprint(name_bp, url_prefix='/*/**')
app.register_blueprint(logins_bp)
app.register_blueprint(buying_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(fruits_bp)
app.register_blueprint(users_bp)
app.register_blueprint(cart_invoice_bp)


@app.route("/")
def root():
    return "<h1>Welcome to Lyfter Fruits Store!</h1>"


if __name__ == '__main__':
    app.run(debug=True)
