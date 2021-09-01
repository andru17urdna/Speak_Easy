from sqlalchemy.orm import backref
from .db import db
from sqlalchemy.sql import func



event_rsvps = db.Table('event-rsvps',
    db.Column('userId', db.ForeignKey('users.id'), primary_key=True),
    db.Column('eventId', db.ForeignKey('events.id'), primary_key=True)
)

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    event_title = db.Column(db.String(50), index=True, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    event_img = db.Column(db.String(
        1000), nullable=False, default="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Seeder1-BlankPhoto.png")
    event_date = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    private = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    user_id_rsvp = db.relationship("User", secondary = event_rsvps,
                                backref='rsvp_event_id')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_title': self.event_title,
            'description': self.description,
            'event_img': self.description,
            'event_date': self.event_date,
            'private': self.private,
            'created_at': self.created_at,
            'update_at': self.updated_at
        }
