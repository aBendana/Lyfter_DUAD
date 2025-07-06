from flask import Flask
from users_api import users_bp
from products_api import products_bp
from invoices_api import invoices_bp
from singup_login_api import login_register_bp

app = Flask(__name__)

#  registering the blueprints
#app.register_blueprint(name_bp, url_prefix='/*/**')
app.register_blueprint(users_bp)
app.register_blueprint(products_bp)
app.register_blueprint(invoices_bp)
app.register_blueprint(login_register_bp)


@app.route("/")
def root():
    return "<h1>Welcome to Frisby Pet Shop!</h1>"


if __name__ == '__main__':
    app.run(debug=True)
