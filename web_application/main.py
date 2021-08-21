# THIS FILE CONTAINS ALL THE MAIN ROUTES
#  We can change the routes and the functionality here

from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from datetime import datetime as dt
from sqlalchemy import func
import requests
from . import db
from .models import Airline
from .load_model import run_prediction
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
    data["page_name"] = "Flight Prediction"
    return render_template('predict.html', data=data)

@main.route('/predict', methods=['POST'])
def predict():
    data = dict()
    flight = dict()

    FLIGHT_API_KEY = "c9a2daca0495eef5267ab156f9195d41"
    FLIGHT_URL = "http://api.aviationstack.com/v1/flights"

    flight_num = request.form['flight_num']

    data['flight_num'] = flight_num
    
    #Aviation API
    if flight_num:
        api_response = requests.get(FLIGHT_URL, params={"access_key" : FLIGHT_API_KEY, "flight_iata" : flight_num})
        if api_response.status_code == 200:
            api_data = api_response.json()['data']
            data['api_results'] = api_data
            flight['Dep_Airport'] = api_data[0]['departure']['iata']
            flight['Arr_Airport'] = api_data[0]['arrival']['iata']
            flight['Mkt_Ccode'] = api_data[0]['airline']['iata']
            scheduled_takeoff = dt.strptime(api_data[0]['departure']['scheduled'], "%Y-%m-%dT%H:%M:%S+00:00")
            hour = scheduled_takeoff.hour
            if 0 <= hour < 3:
                dep_block = "late_night"
            elif 3 <= hour < 6:
                dep_block = "early_morning"
            elif 6 <= hour < 9:
                dep_block = "morning"
            elif 9 <= hour < 12:
                dep_block = "late_morning"
            elif 12 <= hour < 15:
                dep_block = "early_afternoon"
            elif 15 <= hour < 18:
                dep_block = "late_afternoon"
            elif 18 <= hour < 21:
                dep_block = "evening"
            else:
                dep_block = "late_evening"

            flight['Sched_Dep_Time_OAG_Block'] = dep_block
            flight['month'] = scheduled_takeoff.strftime("%b").lower()
            flight['Day_Week'] = scheduled_takeoff.strftime("%a").lower()
            run_prediction(flight)
        else:
            data['api_results'] = api_response.status_code
            print(api_response)
    # DB Query - Get historical flights between endpoints
    qresults = Airline.query.filter(Airline.Dep_Airport==flight["Dep_Airport"], Airline.Arr_Airport==flight["Arr_Airport"]).limit(100).all()
    search_results = []
    if qresults: 
        for result in qresults:
            search_results.append([result.Date, result.Arr_Delay_Time_Actual])
    data['search_results'] = search_results
    return jsonify(data)


#Airline.query.with_entities(Airline.Date, func.count(Airline.Date)).group_by(Airline.Date).all()
@main.route('/flightsbydate', methods=['POST'])
def flights_by_date():
    data = dict()
    # DB Query
    qresults = Airline.query.with_entities(Airline.Date, func.count(Airline.Date)).group_by(Airline.Date).all()
    data['qresults'] = qresults
    return data


