## THIS IS WHERE WE EDIT THE SETTINGS FOR THE APPLICATION
#  We can configure our database credentials here
DEGUG = True
SQL_USERNAME = "postgres" #your personal username goes here
SQL_PASSWORD = "airlineproject" #your personal password goes here
DB_NAME = "airline_db" #The default name of the DB
DB_HOST = "airline-db.c0dqcvhs1y58.us-east-2.rds.amazonaws.com"
PORT = 5432
SQLALCHEMY_DATABASE_URI = f"postgresql://{SQL_USERNAME}:{SQL_PASSWORD}@{DB_HOST}:{PORT}/{DB_NAME}"
SQLALCHEMY_TRACK_MODIFICATIONS = False