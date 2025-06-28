from flask import Flask
from api_users import users_bp
from api_cars import cars_bp
from api_rentals import rentals_bp
# from singup_login_api import login_register_bp

app = Flask(__name__)

#  registering the blueprints
#app.register_blueprint(name_bp, url_prefix='/*/**')
app.register_blueprint(users_bp)
app.register_blueprint(cars_bp)
app.register_blueprint(rentals_bp)


@app.route("/")
def root():
    return "<h1>Welcome to Lyfter Car Rental!</h1>"


if __name__ == '__main__':
    app.run(debug=True)
