from app.models import db, User


# Adds a demo user, you can add other users here if you want
demo = User(
    username='Demo', email='demo@aa.io', password='password')
marnie = User(
    username='marnie', email='marnie@aa.io', password='password')
bobbie = User(
    username='bobbie', email='bobbie@aa.io', password='password')
thomas = User(
    username='thomas', email='thomas@aa.io', password='password')
hector = User(
    username='hector', email='hector@aa.io', password='password')

def seed_users():

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(thomas)
    db.session.add(hector)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
