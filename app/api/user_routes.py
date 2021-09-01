from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User
from flask_login import current_user

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.filter(current_user.id != User.id).all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/check-username', methods=['PATCH'])
def check_username():
    username = request.get_json()
    user = User.query.filter(User.username == username["username"]).first()
    if user:
        return {"message":'User Name is already in use.'}
    else:
        return {"message": 'User Name is available'}


@user_routes.route('/check-email', methods=['PATCH'])
def check_email():
    email = request.get_json()
    user_email = User.query.filter(User.email == email["email"]).first()
    if user_email:
        return {"message":'Email is already in use.'}
    else:
        return {"message": 'Email is not in use'}
