from flask import Flask, Blueprint, request, jsonify, g
from repository_contacts import ContactsRepository
from decorator_authenticator import admin_only
from validations import Validations


admin_contacts_repo = ContactsRepository()
admin_contacts_bp = Blueprint('admin_contacts', __name__)

@admin_contacts_bp.route("/admin/contacts", methods=['POST'])
@admin_only
def admin_create_contact():
    try:
        contact_data = request.get_json()
        admin_contacts_repo.insert_contact(contact_data)
        return jsonify(message="Successful saved", contact=contact_data), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500 


@admin_contacts_bp.route("/admin/contacts/many", methods=['POST'])
@admin_only
def admin_create_many_contacts():
    try:
        contacts_data_list = request.get_json()
        admin_contacts_repo.insert_many_contacts(contacts_data_list)
        return jsonify(message="Contacts have been successfully saved", contacts=contacts_data_list), 200

    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500



# show all contacts or select contacts by id, user_id, email, name, phone_number (query parameters)
@admin_contacts_bp.route("/admin/contacts", methods=['GET'])
@admin_only
def admin_show_contacts():
    try:
        query_params = request.args
        if query_params:
            column = list(request.args.keys())[0]
            filter_value = request.args.get(column)
            if column and filter_value:
                formatted_contacts = admin_contacts_repo.admin_get_contact_by_value(column, filter_value)
            else:
                raise ValueError(f"Column or column's value info incomplete")

        else:
            formatted_contacts = admin_contacts_repo.admin_show_contacts()

    except ValueError as error:
        return jsonify(error = str(error)), 400
    except Exception as error:
        return jsonify(error = str(error)), 500  
    return jsonify(formatted_contacts), 200


# update a contact by path parameter contact id (id or user_id can't be changed)
@admin_contacts_bp.route("/admin/contacts/<id_value>", methods=['PATCH'])
@admin_only
def admin_update_contact(id_value):
    try:
        contact_data = request.get_json()

        # prevents 'contact id' or 'contact user_id' from being changed
        contact_data.pop("id", None)
        contact_data.pop("user_id", None)
        for contact_key, contact_value in contact_data.items():
            column_modify = contact_key
            new_value = contact_value
            # updating
            admin_contacts_repo.update_contact("id", id_value, column_modify, new_value)

        return jsonify(message="Successful updated"), 200
    
    except ValueError as error:
        return jsonify(error=str(error)), 400
    except Exception as error:
        return jsonify(error=str(error)), 500


# delete contact by path parameter id
@admin_contacts_bp.route("/admin/contacts/<id_value>", methods=['DELETE'])
@admin_only
def admin_delete_contact(id_value):
    try:
        admin_contacts_repo.delete_contact("id", id_value)
        return jsonify(contact=id_value, message="Successful deleted"), 200

    except Exception as error:
        return jsonify(error = f"{error}"), 400
    except Exception as error:
        return jsonify(error="Internal server error"), 500


# if __name__ == "__main__":
#     app.run(host="localhost", debug=True)  