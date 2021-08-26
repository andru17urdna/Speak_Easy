from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import validators
from wtforms.fields.core import BooleanField, DateTimeField, IntegerField
from wtforms.validators import DataRequired, Length


class MessageForm(FlaskForm):
    text = StringField("text")
    invite = BooleanField("invite")
    to_user_id = IntegerField('to_user_id')
