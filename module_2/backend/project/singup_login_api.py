from flask import Flask, request, jsonify

app = Flask(__name__)

# register a customer
@app.route('/register', methods=['POST'])
def register():

    # info to register
    # obligatory_user_info = ['user_id', 'password', 'type', 'name', 'email', 'address']
    
    # read data base for no duplication of customer

    #register the user

    return jsonify({'message': 'Successful registration'}), 201


# Endpoint de login
@app.route('/login', methods=['POST'])
def login():

    # ask for username or email and password

    # attempt error algorithm / 3 times, block user if it's necessary

    # verify if user is register and check if is an administrator or customer

    # apply the right profile, what permissions different user have?

    # let the user take action]

    return jsonify({'message': 'Successful login!'}), 200

if __name__ == "__main__":
    app.run(host="localhost", debug=True)  
