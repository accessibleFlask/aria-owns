from flask import Flask

# Initialize
app = Flask(__name__)

# Load routes
from app import routes

# Config goes here
app.config.from_envvar('FLASK_CONFIG')
