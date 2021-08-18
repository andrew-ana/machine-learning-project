# THIS FILE CONTAINS ALL THE MAIN ROUTES
#  We can change the routes and the functionality here

from flask import Blueprint, render_template, request, redirect, url_for, jsonify
#from . import db
#from .models import *
import json
import os
import random

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return redirect(url_for('main.home'))

@main.route('/home')
def home():
    data = dict()
    data["page_name"] = "Home"
    return render_template('home.html', data=data)

@main.route('/about')
def about():
    data = dict()
    data["page_name"] = "About"
    return render_template('other.html', data=data)

@main.route('/other')
def other():
    data = dict()
    data["page_name"] = "Other"
    return render_template('other.html', data=data)

@main.route('/predict', methods=['POST'])
def predict():
    data = dict()
    data['airport'] = request.form['airport']
    data['flight_num'] = request.form['flight_num']
    data['width'] = str(random.randint(100,400))
    data['height'] = str(random.randint(100,400))
    return data