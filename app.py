# import necessary libraries
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from config import URI

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

from flask_sqlalchemy import SQLAlchemy
# app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///nflDB.db"

#  os.environ.get('DATABASE_URL', '') or 

# Remove tracking modifications
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

engine = create_engine(URI)


# results = session.query(Positions.position, Positions.offenseDefense).all()

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")



@app.route("/api/salaries")
def salaries():

    results = engine.execute('''select * from rosters''')
    

    # hover_text = [result[1] for result in results]
    # year = [result[0] for result in results]
    # salary = [result[1] for result in results]

    salary_data = []

    for team, player, year, salary in results:
        salary_dict = {}
        salary_dict['team'] = team
        salary_dict['player'] = player
        salary_dict['year'] = year
        salary_dict['salary'] = salary
        salary_data.append(salary_dict)

    return jsonify(salary_data)


if __name__ == "__main__":
    app.run()
