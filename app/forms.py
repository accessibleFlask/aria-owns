from wtforms import Form, BooleanField, RadioField, SelectField, validators
from wtforms.fields.html5 import EmailField

# Since these build upon each other, we can chain them until we die

class EmailOnlyForm(Form):
    email = EmailField(label='Your Email',
        validators=[
            validators.Length(min=6, message=u'Your email address needs to be 6 or more characters.'),
            validators.Email(message=u'The email address you entered has a problem - check for typos.')
        ])


class EmailAndCheckboxForm(EmailOnlyForm):
    checkbox = BooleanField(label='I am not a robot',
        validators=[validators.InputRequired(
            message=u"Please verify you aren't a robot")])


class EmailCheckboxRadioForm(EmailAndCheckboxForm):
    radio = RadioField(label='How often do you wish to receive mail from us?',
        validators=[validators.InputRequired(
            message=u'Please select how often you wish to receive mail')],
            choices=[(0, 'Hourly'), (1, 'Daily'), (2, 'Weekly'), (3, 'Fortnightly'), (4, 'Monthly')],
        coerce=int)


class EmailCheckboxRadioSelectForm(EmailCheckboxRadioForm):
    select = SelectField(label='Preferred email format:',
        validators=[validators.InputRequired(
            message=u'Please choose a preferred email format')],
            choices=[(0, 'Newsletter'), (1, 'Digest'), (2, 'Article'), (3, 'Plain Text')],
        coerce=int)


class OneBigClunkyValidator(Form):
    email = EmailField(label='Your Email',
        validators=[
            validators.Length(min=6, message=u'Your email address needs to be 6 or more characters.'),
            validators.Email(message=u'The email address you entered has a problem - check for typos.')
        ])
    checkbox = BooleanField(label='I am not a robot',
        validators=[validators.InputRequired(
            message=u"Please verify you aren't a robot")])
    radio = RadioField(label='How often do you wish to receive mail from us?',
        validators=[validators.InputRequired(
            message=u'Please select how often you wish to receive mail')],
            choices=[(0, 'Daily'), (1, 'Weekly'), (2, 'Fortnightly'), (3, 'Monthly')])
    select = SelectField(label='Kinds of mail:',
        validators=[validators.InputRequired(
            message=u'Please choose a mail kind')],
            choices=[(0, 'Newsletter'), (1, 'Digest'), (2, 'Article'), (3, 'Plain Text')])
