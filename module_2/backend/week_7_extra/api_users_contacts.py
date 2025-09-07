from flask import Flask, Blueprint, request, jsonify, g
from repository_contacts import ContactsRepository
from decorator_authenticator import users_only, cb_user_only
from validations import Validations


users_contacts_repo = ContactsRepository()
users_contacts_bp = Blueprint('users_contacts', __name__)

@users_contacts_bp.route("/users/contacts", methods=['POST'])
@users_only
def user_create_contact():
    try:
        user_id = g.user_id
        user_name = g.user_name

        contact_data = request.get_json()
        # ensuring that data has the correct user_id from the user in session
        contact_data["user_id"] = user_id

        # checking if contact with same email or phone_number already exists for this user
        repeat_phone_number = users_contacts_repo.get_repeated_contact("phone_number", "user_id", contact_data["phone_number"], user_id)
        repeat_email = users_contacts_repo.get_repeated_contact("email", "user_id", contact_data["email"], user_id)
        if not repeat_email == [] or not repeat_phone_number == []:
            raise ValueError(f"Contact with email '{contact_data['email']}' or phone number '{contact_data['phone_number']}' already exists in your contact book")

        contact_result = users_contacts_repo.insert_contact(contact_data)
        return jsonify(message=f"{user_name} your contact has been successfully saved", contact=contact_result), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500


@users_contacts_bp.route("/users/contacts/many", methods=['POST'])
@users_only
def user_create_many_contacts():
    try:
        user_id = g.user_id
        user_name = g.user_name

        contacts_data_list = request.get_json()
        for contact_data in contacts_data_list:
            # ensuring that all data has the correct user_id from the user in session
            contact_data["user_id"] = user_id

            # checking if contact with same email or phone_number already exists for this user
            repeat_phone_number = users_contacts_repo.get_repeated_contact("phone_number", "user_id", contact_data["phone_number"], user_id)
            repeat_email = users_contacts_repo.get_repeated_contact("email", "user_id", contact_data["email"], user_id)
            if not repeat_email == [] or not repeat_phone_number == []:
                raise ValueError(f"Contact with email '{contact_data['email']}' or phone number '{contact_data['phone_number']}' already exists in your contact book")
        
        users_contacts_repo.insert_many_contacts(contacts_data_list)
        return jsonify(message=f"{user_name} your contacts have been successfully saved", contacts=contacts_data_list), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500


# show all contacts of a specific user 
# or select contacts by id, email, name, phone_number (query parameters)
@users_contacts_bp.route("/users/contacts", methods=['GET'])
@users_only
def user_show_contacts():
    try:
        user_id = g.user_id

        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            if column and filter_value:
                formatted_contacts = users_contacts_repo.cb_user_get_contact_by_value(column, "user_id", filter_value, user_id)
            else:
                raise ValueError(f"Column or column's value info incomplete")

        else:
            formatted_contacts = users_contacts_repo.cb_user_show_contacts(user_id)

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    return jsonify(formatted_contacts), 200


# update a contact by path parameter contact id(id or user_id can't be changed)
@users_contacts_bp.route("/users/contacts/<id_value>", methods=['PATCH'])
@users_only
def user_update_contact(id_value):
    try:
        user_id = g.user_id
        contact_data = request.get_json()

        # ensures the contact belongs to the user that is in the login session
        users_contacts_repo.cb_user_get_contact_by_value("id", "user_id", id_value, user_id)

        # prevents 'contact id' or 'contact user_id' from being changed
        contact_data.pop("id", None)
        contact_data.pop("user_id", None)
        for contact_key, contact_value in contact_data.items():
            column_modify = contact_key
            new_value = contact_value
            # updating
            users_contacts_repo.update_contact("id", id_value, column_modify, new_value)

        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500


# delete contact by path parameter id
@users_contacts_bp.route("/users/contacts/<id_value>", methods=['DELETE'])
@users_only
def user_delete_contact(id_value):
    try: 
        user_id = g.user_id
        # ensures the contact being the user's own contact in login session
        users_contacts_repo.cb_user_get_contact_by_value("id", "user_id", id_value, user_id)

        users_contacts_repo.delete_contact("id", id_value)
        return jsonify(contact=id_value, message="Successful deleted"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  