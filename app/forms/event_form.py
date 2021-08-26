from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import validators
from wtforms.fields.core import BooleanField, DateTimeField
from wtforms.validators import DataRequired, Length


class EventForm(FlaskForm):
    description = StringField("description")
    event_date = DateTimeField("date", format='%m/%d/%Y %H:%M:%S', validators=[validators.Optional(),])
    event_img = StringField('img')
    event_title = StringField("title")
    private = BooleanField("private")
