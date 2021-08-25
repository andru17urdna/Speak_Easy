from flask import Blueprint, jsonify, request
from app.models import Message


message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:id>')
def get_one_message(id):
    message = Message.query.get(id)
    return message.to_dict()
