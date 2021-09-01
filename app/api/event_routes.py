from flask import Blueprint, jsonify, request
from app.models import db, Event
from app.forms.event_form import EventForm
from flask_login import current_user


event_routes = Blueprint('events', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# @event_routes.route('/')
# def get_all_events():
#     events = Event.query.all()
#     return {'events': [event.to_dict() for event in events]}

@event_routes.route('/')
def get_all_events():
    events = Event.query.all()
    return {'events': {event.id: event.to_dict() for event in events}}


@event_routes.route('/user-events/<int:id>')
def get_user_events(id):
    events = Event.query.filter(Event.user_id == id).all()
    return {event.id: event.to_dict() for event in events}


@event_routes.route('/<int:id>')
def get_one_event(id):
    print(id)
    event = Event.query.get(id)
    return event.to_dict()

@event_routes.route('/', methods=["POST"])
def create_event():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_event = Event(
            user_id =current_user.id,
            description = form.data['description'],
            event_date = form.data['event_date'],
            event_img = form.data['event_img'],
            event_title = form.data['event_title'],
            private = form.data['private_event']
        )

        db.session.add(new_event)
        db.session.commit()
        print(new_event.to_dict())
        return {'event': new_event.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}


@event_routes.route('/<int:id>', methods=["PUT"])
def edit_event(id):
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edited_event = Event.query.get_or_404(id)
        if edited_event.user_id == current_user.id:
            edited_event.description = form.data['description']
            edited_event.event_date = form.data['event_date']
            edited_event.event_img = form.data['event_img']
            edited_event.event_title = form.data['event_title']
            edited_event.private = form.data['private_event']
            db.session.commit()
            return {'event': edited_event.to_dict()}
        return {"errors": ["The only way you could see this is if you didn't make it"]}
    return {'errors': validation_errors_to_error_messages(form.errors)}



@event_routes.route('/<int:id>', methods=["DELETE"])
def delete_event(id):
    event = Event.query.get_or_404(id)
    db.session.delete(event)
    db.session.commit();
    return{'event_id':event.id}







# @event_routes.route('/newest/<int:id>/<int:limit>')
# def get_next_recent_events(id, limit):
#     events = Event.query.order_by(Event.created_at.desc()).limit(limit)
#     return {'events': [event.to_dict() for event in events]}
