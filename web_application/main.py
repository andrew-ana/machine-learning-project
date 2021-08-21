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

@main.route('/about')
def about():
    data = dict()
    data["page_name"] = "About"
    return render_template('about.html', data=data)

@main.route('/other')
def other():
    data = dict()
    data["page_name"] = "Other"
    return render_template('other.html', data=data)

@main.route('/delay-by-departure')
def delay_by_departure():
    data = dict()
    data["page_name"] = "Delays by Departure"
    return render_template('delaybydeparture.html', data=data)

@main.route('/delay-by-arrival')
def delay_by_arrival():
    data = dict()
    data["page_name"] = "Delays by Arrival"
    return render_template('delaybyarrival.html', data=data)