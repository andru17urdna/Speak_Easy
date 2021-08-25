from app.models import db, Message



message1 = Message(
    text = "Hey, I'm a text message sent to another user, how amazing.",
    to_user_id = 3,
    from_user_id = 1
)

message2 = Message(
    text = "Hey, I'm an invite message sent to another user, how amazing.",
    invite = True,
    to_user_id = 2,
    from_user_id = 3
)

message3 = Message(
    text = "Whaddup Tony, did you hide the body?",
    invite = True,
    to_user_id = 2,
    from_user_id = 3
)

def seed_messages():
    message_list = [message1, message2, message3 ]
    for message in message_list:
        db.session.add(message)
    db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
