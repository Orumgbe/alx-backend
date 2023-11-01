#!/usr/bin/env python3
"""Module has basic setup for a flask app"""

from flask import g, Flask, render_template, request
from flask_babel import Babel
import pytz
from typing import Union

app = Flask(__name__)


class Config:
    """Configure available languages"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale() -> str:
    """Returns the best match locale of user"""
    # Locale from url param
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    # Locale from mock users
    if g.user and g.user['locale'] in app.config['LANGUAGES']:
        return g.user['locale']
    # Locale from request header
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@babel.timezoneselector
def get_timezone():
    """Returns the timezone of user"""
    tzone = request.args.get('timezone')
    if tzone:
        try:
            pytz.timezone(tzone)
            return tzone
        except pytz.exceptions.UnknownTimeZoneError:
            pass
    elif g.user and g.user['timezone']:
        try:
            pytz.timezone(g.user['timezone'])
        except pytz.exceptions.UnknownTimeZoneError:
            return app.config['BABEL_DEFAULT_TIMEZONE']
    else:
        return app.config['BABEL_DEFAULT_TIMEZONE']


@app.route("/", strict_slashes=False)
def index():
    """Render template for index page"""
    return render_template("7-index.html")


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user() -> Union[dict, None]:
    """Gets user ID and return user dictionary if found"""
    user_id = request.args.get('login_as')
    if user_id is not None:
        return users.get(int(user_id))
    return None


@app.before_request
def before_request():
    """Store user in flask.g object"""
    g.user = get_user()


if __name__ == "__main__":
    app.run(debug=True)
