from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy.ext.associationproxy import association_proxy

friends = db.Table('friends',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    user_img = db.Column(db.String(
        500), nullable=False, default="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Seeder1-BlankPhoto.png")
    description = db.Column(db.String(255))

    message_to = association_proxy('message_to_user', 'to_user')
    message_from = association_proxy('message_from_user', 'from_user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'email': self.email,
            'user_img': self.user_img,
            'description': self.description
        }



class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    text = db.Column(db.String(500), nullable=False)
    invite = db.Column(db.Boolean, default=False)
    to_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), index=True)
    from_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), index=True)
    created_at = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    to_user = db.relationship(User,
                              primaryjoin = (to_user_id == User.id),
                              backref = 'message_to_user')
    from_user = db.relationship(User,
                                primaryjoin = (from_user_id == User.id),
                                backref='message_from_user')



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'text': self.text,
            'invite': self.invite,
            'to_user_id': self.to_user_id,
            'from_user_id': self.from_user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
