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
    event_title = "Thomas's 400th Birthday",
    description = "Somehow he has made it. We thought he was going to kick the bucket last year",
    event_img = 'https://i.pinimg.com/originals/1a/b6/ef/1ab6ef77b355e9acd7cc9b82b5c8ec4f.jpg'
)

inigo_montoya_fan_gathering = Event(
    user_id = 2,
    event_title = "Inigo Montoyo Fan Meet",
    description = "Meet your favorite character from Princess Bride",
    event_img = 'https://www.dictionary.com/e/wp-content/uploads/2018/03/Inigo-Montoya1.jpg'
)

graduation = Event(
    user_id = 3,
    event_title = "Goat Yogi Licensure Graduation",
    description = "Come watch as your favorite students graduate. Mind the goats.",
    event_img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzaWebIGLju8DYFzmLhl0Zwiy3rc0Zzh6yTA&usqp=CAU'
)

monte_python_movie_night = Event(
    user_id = 3,
    event_title = "Monte Python Movie Night",
    description = "Will it ever happen? Who knows? Probably not!?",
    event_img = 'https://cdn.vox-cdn.com/thumbor/nJVxLLabV1ahHAsNDewNxGTGjz8=/0x0:1920x1080/1400x933/filters:focal(711x45:1017x351):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/66894849/seeso_Monty_Python_And_The_Holy_Grail_Mov_Full_Image_GalleryBackground_en_US_1483993549331._RI_.0.jpg'
)

paris_dolly_partin = Event(
    user_id = 1,
    event_title = "Dolly Partin: Live in Paris, France",
    description = "Your 2 favorite P-Words, now live on stage!",
    event_img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW4nk0Jmv644S0AE6bemjOZNGapkO-7KnHPg&usqp=CAU'
)

chess_boxing = Event(
    user_id = 4,
    event_title = "Chess-Boxing Finale",
    description = "Let these fighters prove to you that boxing does not cause brain damage.",
    event_img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqad0V3UhxFInfwkDIbVVymCPCMrUaHv_3-A&usqp=CAU'
)

crazy_taxi = Event(
    user_id = 7,
    event_title = "Crazy Taxi Rememberance",
    description = "Come on down and enjoy your favorite arcade games from that one really bad pizza buffet in your home town",
    event_img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkTlYVIASuRBENwanj_3mGwFuY-Loxfw2mqw&usqp=CAU'
)

def seed_events():
    event_list = [crazy_taxi, chess_boxing, dog_wedding, bradleys_4, inigo_montoya_fan_gathering, graduation, monte_python_movie_night, paris_dolly_partin]
    for event in event_list:
        db.session.add(event)






    db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
