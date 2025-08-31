from flask import Flask
from api_login import logins_bp
from api_users import users_bp
from api_contacts import contacts_bp



app = Flask(__name__)

#  registering the blueprints
#app.register_blueprint(name_bp, url_prefix='/*/**')
app.register_blueprint(logins_bp)
app.register_blueprint(users_bp)
app.register_blueprint(contacts_bp)



@app.route("/")
def root():
    return "<h1>Welcome to Lyfter Contacts Book!</h1>"


if __name__ == '__main__':
    app.run(debug=True)
