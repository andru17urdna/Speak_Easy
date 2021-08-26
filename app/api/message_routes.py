from flask import Blueprint, jsonify, request
from app.models import db, Message
from app.forms.message_form import MessageForm
from flask_login import current_user


message_routes = Blueprint('messages', __name__)

def validation_errors_to_error_messages(validation_errors):

    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@message_routes.route('/')
def get_all_messages():
    messages = Message.query.all()
    return {'messages': {message.id: message.to_dict() for message in messages}}


@message_routes.route('/', methods=["POST"])
def create_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_message = Message(
            text = form.data['text'],
            invite = form.data['invite'],
            to_user_id = form.data['to_user_id'],
            from_user_id = current_user.id
        )

        db.session.add(new_message)
        db.session.commit()
        return {'message': new_message.to_dict()}
    print({'errors': validation_errors_to_error_messages(form.errors)}, 401)
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@message_routes.route('/<int:id>', methods=["PUT"])
def edit_message(id):
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edited_message = Message.query.get_or_404(id)
        edited_message.text = form.data['text']
        edited_message.invite = form.data['invite']
        edited_message.to_user_id = form.data['to_user_id']
        db.session.commit()
        return {'message': edited_message.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}



@message_routes.route('/<int:id>', methods=["DELETE"])
def delete_message(id):
    message = Message.query.get_or_404(id)
    db.session.delete(message)
    db.session.commit();
    return{'message_id': message.id}

@message_routes.route('/<int:id>')
def get_one_message(id):
    message = Message.query.get(id)
    return message.to_dict()
