from app.models import db, User


# Adds a demo user, you can add other users here if you want
demo = User(
    username='Demo', email='demo@aa.io', password='password', user_img='https://thispersondoesnotexist.com/image', description='If you can stay calm, while all around you is chaos…then you probably haven’t completely understood the seriousness of the situation.')
marnie = User(
    username='marnie', email='marnie@aa.io', password='password',  user_img='https://thispersondoesnotexist.com/image', description='A person who smiles in the face of adversity…probably has a scapegoat.')
bobbie = User(
    username='bobbie', email='bobbie@aa.io', password='password', user_img='https://thispersondoesnotexist.com/image', description='Plagiarism saves time.')
thomas = User(
    username='thomas', email='thomas@aa.io', password='password', user_img='https://thispersondoesnotexist.com/image', description='Plagiarism saves time.')
hector = User(
    username='hector', email='hector@aa.io', password='password', user_img='https://thispersondoesnotexist.com/image', description='The beatings will continue until morale improves.')
wavey_davey =User(
    username='wavey-davey', email='wavey-davey@aa.io', password='password',   user_img='https://thispersondoesnotexist.com/image', description='INDECISION is the key to FLEXIBILITY.')
tony = User(
    username='tony', email='tony@aa.io', password='password', user_img='https://thispersondoesnotexist.com/image', description='Artificial Intelligence is no match for Natural Stupidity')
slim_jim = User(
    username='slim-jim', email='slim-jim@aa.io', password='password', user_img='https://thispersondoesnotexist.com/image', description='A snooze button is a poor substitute for no alarm clock at all.')
turbo = User(
    username='turbo', email='turbo@aa.io', password='password', user_img='https://thispersondoesnotexist.com/image', description=' We waste time, so you don’t have to.')
rick = User(
    username='rick', email='rick@aa.io', password='password', user_img='https://thispersondoesnotexist.com/image', description='Doing a job RIGHT the first time gets the job done. Doing the job WRONG fourteen times gives you job security.')

def seed_users():

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(thomas)
    db.session.add(hector)
    db.session.add(wavey_davey)
    db.session.add(tony)
    db.session.add(slim_jim)
    db.session.add(turbo)
    db.session.add(rick)

    demo.friends.extend([marnie, bobbie])
    marnie.friends.extend([demo])
    bobbie.friends.extend([demo])
    

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
