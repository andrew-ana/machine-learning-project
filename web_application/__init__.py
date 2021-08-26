## THIS FILE INITIALIZES THE WEB APPLICATION.
#  We shouldn't need to edit it often, except to add database connection

## DEPENDENCIES
import os
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

# Create db outside of factory
db = SQLAlchemy()

# Create the app
def create_app(test_config=None):

    # Create the App - It will be named whatever the parent folder is named
    app = Flask(__name__, static_url_path='', template_folder='templates')

    # Config from file
    app.config.from_object('config')
    
    # Initialize DataBase Connection
    db.init_app(app)
    
    # blueprint for main parts of app
    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app