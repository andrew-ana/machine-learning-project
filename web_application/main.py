# THIS FILE CONTAINS ALL THE MAIN ROUTES
#  We can change the routes and the functionality here

from flask import Blueprint, render_template, request, redirect, url_for, jsonify
#from . import db
#from .models import *
import json
import os

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return redirect(url_for('main.home'))

@main.route('/home')
def home():
    data = dict()
    data["page_name"] = "Home"
    return render_template('home.html', data=data)