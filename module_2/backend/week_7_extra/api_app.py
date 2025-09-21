from flask import Flask
from api_login import logins_bp
from api_admin_users import admin_users_bp
from api_admin_contacts import admin_contacts_bp
from api_users_contacts import users_contacts_bp




app = Flask(__name__)

#  registering the blueprints
#app.register_blueprint(name_bp, url_prefix='/*/**')
app.register_blueprint(logins_bp)
app.register_blueprint(admin_users_bp)
app.register_blueprint(admin_contacts_bp)
app.register_blueprint(users_contacts_bp)


@app.route("/")
def root():
    return "<h1>Welcome to Lyfter Contacts Book!</h1>"


if __name__ == '__main__':
    app.run(debug=True)
