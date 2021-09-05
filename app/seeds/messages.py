from app.models import db, Message



message1 = Message(
    text = "Hey, I'm a text message sent to another user, how amazing.",
    to_user_id = 3,
    from_user_id = 1
)

message2 = Message(
    text = "Hey, I'm an invite message sent to another user, how amazing.",
    invite = False,
    to_user_id = 2,
    from_user_id = 3
)

message3 = Message(
    text = "Whaddup Tony, did you hide the eggs?",
    invite = False,
    to_user_id = 2,
    from_user_id = 3
)

message4 = Message(
    text = "Whaddup Tony, did you hide the eggs?",
    invite = False,
    to_user_id = 1,
    from_user_id = 2
)

message5 = Message(
    text = "The eggs are hidden",
    invite = False,
    to_user_id = 1,
    from_user_id = 3
)

message6 = Message(
    text = "Why does everyone talk about eggs?",
    invite = False,
    to_user_id = 1,
    from_user_id = 2
)

message7 = Message(
    text = "This event looks like a crazy event.",
    invite = False,
    to_user_id = 1,
    from_user_id = 2
)

message8 = Message(
    text = "Cement shoes",
    invite = False,
    to_user_id = 1,
    from_user_id = 2
)

message9 = Message(
    text = "How's about no?",
    invite = False,
    to_user_id = 1,
    from_user_id = 2
)

message10= Message(
    text = "You should go to that crazy taxi event.",
    invite = False,
    to_user_id = 6,
    from_user_id =1
)

message11= Message(
    text = "You live in Paris! Go see Dolly Partin!",
    invite = False,
    to_user_id = 4,
    from_user_id =1
)

message12= Message(
    text = "I hate how vague you are.",
    invite = False,
    to_user_id = 1,
    from_user_id =9
)

message13= Message(
    text = "I honestly don't know how Thomas can be that old..",
    invite = False,
    to_user_id = 1,
    from_user_id = 8
)

message14= Message(
    text = "Do you ever get the feeling that somebody that isn't intended to read these messages has access to them...",
    invite = False,
    to_user_id = 1,
    from_user_id = 6
)

message15= Message(
    text = "And how.",
    invite = False,
    to_user_id = 6,
    from_user_id =1
)

def seed_messages():
    message_list = [message1, message2, message3, message4, message5, message6, message7, message8, message9, message10, message11, message12, message13, message14, message15 ]
    for message in message_list:
        db.session.add(message)
    db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
