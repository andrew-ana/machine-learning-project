from tensorflow.keras.models import load_model
import numpy as np
import pandas as pd


def run_prediction(flight):
    first_row = pd.read_csv('web_application/first_row.csv')
    feature_list = first_row.columns.to_list()
    df = pd.DataFrame(0, index=np.arange(1), columns=feature_list)
    for key in flight.keys():
        col = key+'_'+flight[key]
        df.loc[0,col] = 1
        print(col)
    model = load_model("web_application/nn_v1.h5")
    #prediction = np.argmax(model.predict(df), axis=-1)
    prediction = model.predict(df)
    return round(float(prediction[0][0]), 4)