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
    text = "Whaddup Tony, did you hide the eggs?",
    invite = True,
    to_user_id = 2,
    from_user_id = 3
)

message4 = Message(
    text = "Whaddup Tony, did you hide the eggs?",
    invite = True,
    to_user_id = 1,
    from_user_id = 2
)

message5 = Message(
    text = "The eggs are hidden",
    invite = True,
    to_user_id = 1,
    from_user_id = 3
)

message6 = Message(
    text = "Why does everyone talk about eggs?",
    invite = True,
    to_user_id = 1,
    from_user_id = 2
)

message7 = Message(
    text = "This event looks like a crazy event.",
    invite = True,
    to_user_id = 1,
    from_user_id = 2
)

message8 = Message(
    text = "Cement shoes",
    invite = True,
    to_user_id = 1,
    from_user_id = 2
)

message9 = Message(
    text = "How's about no?",
    invite = True,
    to_user_id = 1,
    from_user_id = 2
)

def seed_messages():
    message_list = [message1, message2, message3, message4, message5, message6, message7, message8, message9 ]
    for message in message_list:
        db.session.add(message)
    db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
