from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms import validators
from wtforms.fields.core import BooleanField, DateTimeField
from wtforms.validators import DataRequired, Length


class EventForm(FlaskForm):
    description = StringField("description", validators=[DataRequired(), Length(min=20, max=255)])
    event_date = DateTimeField("event_date", format='%Y-%m-%d %H:%M', validators=[DataRequired()])
    event_img = StringField('event_img', validators=[Length(max=1000)])
    event_title = StringField("event_title", validators=[DataRequired(), Length(min=10, max=50)])
    private_event = BooleanField("private_event", validators=[validators.Optional(),])
