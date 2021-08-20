# THIS FILE CONTAINS ALL THE MAIN ROUTES
#  We can change the routes and the functionality here

from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from sqlalchemy import func
import requests
from . import db
from .models import Airline
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

    FLIGHT_API_KEY = "c9a2daca0495eef5267ab156f9195d41"
    FLIGHT_URL = "http://api.aviationstack.com/v1/flights"

    departing_airport = request.form['departing_airport']
    arriving_airport = request.form['arriving_airport']
    flight_num = request.form['flight_num']
    
    data['flight_num'] = flight_num
    data['arriving_airport'] = arriving_airport
    data['departing_airport'] = departing_airport
    
    #Aviation API
    if flight_num:
        api_response = requests.get(FLIGHT_URL, params={"access_key" : FLIGHT_API_KEY, "flight_iata" : flight_num})
        if api_response.status_code == 200:
            api_data = api_response.json()['data']
            data['api_results'] = api_data
            print(api_data)
        else:
            data['api_results'] = api_response.status_code
            print(api_response)

    # DB Query
    qresults = Airline.query.filter(Airline.Dep_Airport==departing_airport, Airline.Arr_Airport==arriving_airport).limit(10).all()
    search_results = []
    if qresults: 
        for result in qresults:
            print("Tail Number", result.Tail_Number)
            print("Flight Date", result.Date)
            search_results.append([result.Tail_Number, result.Date])
    data['search_results'] = search_results
    return jsonify(data)

#Features: 
# features = ["Mkt_Ccode", "Dep_Airport", "Arr_Airport", "Day_Week", "month", "Sched_Dep_Time_OAG_Block"]
# model_name.h5
# model

#Airline.query.with_entities(Airline.Date, func.count(Airline.Date)).group_by(Airline.Date).all()
@main.route('/flightsbydate', methods=['POST'])
def flights_by_date():
    data = dict()
    # DB Query
    qresults = Airline.query.with_entities(Airline.Date, func.count(Airline.Date)).group_by(Airline.Date).all()
    data['qresults'] = qresults
    return data