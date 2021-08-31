from app.models import db, Event
from .users import demo, marnie, bobbie


dog_wedding = Event(
    user_id = 1,
    event_title = "Bradley and Ernesto's Dog Wedding",
    description = "Let's all celebrate this glorious day in style",
    event_img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYCBNjSTyokxQBsoXJu5g69VU8x-xcsguRpA&usqp=CAU'
)

bradleys_4 = Event(
    user_id = 1,
    event_title = "Bradleys 400th Birthday",
    description = "Somehow he has made it. We thought he was going to kick the bucket last year",
    event_img = 'https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Seeder1-BlankPhoto.png'
)

inigo_montoya_fan_gathering = Event(
    user_id = 2,
    event_title = "Inigo Montoyo Fan Meet",
    description = "Meet your favorite character from Princess Bride",
    event_img = 'https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Seeder1-BlankPhoto.png'
)

graduation = Event(
    user_id = 3,
    event_title = "Goat Yogi Licensure Graduation",
    description = "Come watch as your favorite students graduate. Mind the goats.",
    event_img = 'https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Seeder1-BlankPhoto.png'
)

monte_python_movie_night = Event(
    user_id = 3,
    event_title = "Monte Python Movie Night",
    description = "Will it ever happen? Who knows? Probably not!?",
    event_img = 'https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Seeder1-BlankPhoto.png'
)

paris_dolly_partin = Event(
    user_id = 1,
    event_title = "Dolly Partin: Live in Paris, France",
    description = "Your 2 favorite P-Words, now live on stage!",
    event_img = 'https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Seeder1-BlankPhoto.png'
)

def seed_events():
    event_list = [dog_wedding, bradleys_4, inigo_montoya_fan_gathering, graduation, monte_python_movie_night, paris_dolly_partin]
    for event in event_list:
        db.session.add(event)






    db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
