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

message4 = Message(
    text = "Whaddup Tony, did you hide the body?",
    invite = True,
    to_user_id = 1,
    from_user_id = 2
)

message5 = Message(
    text = "The body is hidden",
    invite = True,
    to_user_id = 1,
    from_user_id = 3
)

message6 = Message(
    text = "Good. I hope that we do not get found out",
    invite = True,
    to_user_id = 1,
    from_user_id = 2
)

def seed_messages():
    message_list = [message1, message2, message3, message4, message5, message6 ]
    for message in message_list:
        db.session.add(message)
    db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
