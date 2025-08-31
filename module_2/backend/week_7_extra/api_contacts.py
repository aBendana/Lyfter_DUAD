from flask import Flask, Blueprint, request, jsonify, g
from repository_contacts import ContactsRepository
from decorator_authenticator import admin_only, cb_user_only
from validations import Validations


contacts_repo = ContactsRepository()
contacts_validations = Validations()

contacts_bp = Blueprint('contacts', __name__)

# contact book user - create contact
@contacts_bp.route("/contacts/cb_user", methods=['POST'])
@cb_user_only
def user_create_contact():
    try:
        user_id = g.user_id
        user_name = g.user_name
        user_role = g.user_role

        contact_data = request.get_json()
        contacts_repo.insert_contact(user_id, user_role, contact_data)
        return jsonify(message=f"{user_name} your contact has been successfully saved", contact=contact_data), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    

# admin - create contact
@contacts_bp.route("/contacts/admin", methods=['POST'])
@admin_only
def admin_create_contact():
    try:
        user_id = g.user_id
        user_role = g.user_role

        contact_data = request.get_json()
        contacts_repo.insert_contact(user_id, user_role, contact_data)
        return jsonify(message="Successful saved", contact=contact_data), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500 


# # contact book user create - insert many contacts
@contacts_bp.route("/contacts/cb_user/many", methods=['POST'])
@cb_user_only
def user_create_many_contacts():
    try:
        user_id = g.user_id
        user_name = g.user_name
        user_role = g.user_role

        contacts_data = request.get_json()
        contacts_repo.insert_many_contacts(user_id, user_role, contacts_data)
        return jsonify(message=f"{user_name} your contacts have been successfully saved", contacts=contacts_data), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    

    # # contact book user create - insert many contacts



@contacts_bp.route("/contacts/admin/many", methods=['POST'])
@admin_only
def admin_create_many_contacts():
    try:
        user_id = g.user_id
        user_role = g.user_role

        contacts_data = request.get_json()
        contacts_repo.insert_many_contacts(user_id, user_role, contacts_data)
        return jsonify(message="Contacts have been successfully saved", contacts=contacts_data), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500



# show all contacts or select contacts by id, email, name, phone_number (query parameters)
@contacts_bp.route("/contacts/cb_user", methods=['GET'])
@cb_user_only
def user_show_contacts():
    try:
        user_id = g.user_id
        user_role = g.user_role
        
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            if column and filter_value:
                formatted_contacts = contacts_repo.get_contact_by_value(user_role, user_id, column, filter_value)
            else:
                raise ValueError(f"Column or column's value info incomplete")

        else:
            formatted_contacts = contacts_repo.get_contacts(user_id, user_role)

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500
    return jsonify(formatted_contacts), 200



# show all contacts or select contacts by id, user_id, email, name, phone_number (query parameters)
@contacts_bp.route("/contacts/admin", methods=['GET'])
@admin_only
def admin_show_contacts():
    try:
        user_id = g.user_id
        user_role = g.user_role
        
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            if column and filter_value:
                formatted_contacts = contacts_repo.get_contact_by_value(user_role, user_id, column, filter_value)
            else:
                raise ValueError(f"Column or column's value info incomplete")

        else:
            formatted_contacts = contacts_repo.get_contacts(user_id, user_role)

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500  
    return jsonify(formatted_contacts), 200



# update a contact by path parameter contact id or email(id or user_id can't be changed)
@contacts_bp.route("/contacts/cb_user/<column>/<value>", methods=['PATCH'])
@cb_user_only
def user_update_contact(column, value):
    try:
        user_id = g.user_id
        user_role = g.user_role
        contact_data = request.get_json()

        # prevents 'contact id' or 'contact user_id' from being changed
        contact_data.pop("id", None)
        contact_data.pop("user_id", None)
        for contact_key, contact_value in contact_data.items():
            column_modify = contact_key
            new_value = contact_value
            # updating
            contacts_repo.update_contact(user_id, user_role, column, value, column_modify, new_value)

        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500



# update a contact by path parameter contact id or email(id or user_id can't be changed)
@contacts_bp.route("/contacts/admin/<column>/<value>", methods=['PATCH'])
@admin_only
def admin_update_contact(column, value):
    try:
        user_id = g.user_id
        user_role = g.user_role
        contact_data = request.get_json()

        # prevents 'contact id' or 'contact user_id' from being changed
        contact_data.pop("id", None)
        contact_data.pop("user_id", None)
        for contact_key, contact_value in contact_data.items():
            column_modify = contact_key
            new_value = contact_value
            # updating
            contacts_repo.update_contact(user_id, user_role, column, value, column_modify, new_value)

        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500



# delete contact by path parameter id or email
@contacts_bp.route("/contacts/cb_user/<column>/<value>", methods=['DELETE'])
@cb_user_only
def user_delete_contact(column, value):
    try:
        user_id = g.user_id
        user_role = g.user_role
        contacts_repo.delete_contact(user_id, user_role, column, value)
        return jsonify(contact=value, message="Successful deleted"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500



# delete contact by path parameter id or email
@contacts_bp.route("/contacts/admin/<column>/<value>", methods=['DELETE'])
@admin_only
def admin_delete_contact(column, value):
    try:
        user_id = g.user_id
        user_role = g.user_role
        contacts_repo.delete_contact(user_id, user_role, column, value)
        return jsonify(contact=value, message="Successful deleted"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  