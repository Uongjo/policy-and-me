from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from .legislators import Legislators, LegislatorSchema, leg_page
from .bills import Bills, BillSchema, bill_page
from .sigs import Sigs, SigSchema, sig_page
import pymysql

# init app
application = Flask(__name__)
application.register_blueprint(leg_page, url_prefix='/legislators')
application.register_blueprint(bill_page, url_prefix='/bills')
application.register_blueprint(sig_page, url_prefix='/sigs')

db_url = "mysql+pymysql://admin:adminswe@dev-test.cklbf2vta3cx.us-east-2.rds.amazonaws.com:3306/innodb"

application.config['SQLALCHEMY_DATABASE_URI'] = db_url
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(application)
ma = Marshmallow(application)

# ------------------------------------------------------------

# function to abstract away search logic
def findSearchResults(search_query, items):
	res = []
	# Lower case for all terms
	terms = [t.lower() for t in search_query.split(' ')]
	for item in items:
		d = dict(item)
		s = set(terms)
		found = 0
		for term in s:
			for attr in d:
				value = d[attr]
				if str(value).lower().find(term) != -1:
					found+=1
					break
		if found == len(s):
			res.append(item)
	return res

# Function to check if sort_by is a valid object attribute
def validate_sort(sort, res):
	if not res or not sort:
		return False
	if sort in dict(res[0]):
		return True
	return False

@application.after_request  # blueprint can also be app~~
def after_request(response):
	header = response.headers
	header['Access-Control-Allow-Origin'] = '*'
	return response


# run server
if __name__ == '__main__':
	application.run(debug=True)
