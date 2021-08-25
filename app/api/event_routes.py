from flask import Blueprint, jsonify, request
from app.models import db, Event


event_routes = Blueprint('events', __name__)



@event_routes.route('/')
def get_all_events():
    events = Event.query.all()
    return {'events': [event.to_dict() for event in events]}


@event_routes.route('/<int:id>')
def get_one_event(id):
    event = Event.query.get(id)
    return event.to_dict()


@event_routes.route('user-events/<int:id>')
def get_user_events(id):
    events = Event.query.filter(Event.user_id == id).all()
    return {'events': [event.id for event in events]}


@event_routes.route('/<int:id>', methods=["DELETE"])
def delete_event(id):
    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit();
    return{'event_id':event.id}







@event_routes.route('/newest/<int:limit>')
def get_next_recent_events(limit):
    events = Event.query.order_by(Event.created_at.desc()).limit(limit)
    return {'events': [event.to_dict() for event in events]}
