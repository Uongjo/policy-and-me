from flask import Blueprint, Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from .legislators import Legislators
import pymysql

# init app
application = Flask(__name__)
db_url = "mysql+pymysql://admin:adminswe@dev-test.cklbf2vta3cx.us-east-2.rds.amazonaws.com:3306/innodb"

application.config['SQLALCHEMY_DATABASE_URI'] = db_url
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(application)
ma = Marshmallow(application)

class Bills(db.Model):
	bill_id = db.Column(db.String(128), primary_key=True)
	congress = db.Column(db.String(128))
	number = db.Column(db.String(128))
	title = db.Column(db.String(128))
	short_title = db.Column(db.String(128))
	sponsor_id = db.Column(db.String(128))
	sponsor_name = db.Column(db.String(128))
	sponsor_state = db.Column(db.String(128))
	sponsor_party = db.Column(db.String(128))
	congressdotgov_url = db.Column(db.String(128))
	introduced_date = db.Column(db.String(128))
	cosponsors = db.Column(db.String(128))
	committees = db.Column(db.String(128))
	primary_subject = db.Column(db.String(128))
	summary = db.Column(db.String(128))
	summary_short = db.Column(db.String(128))
	latest_major_action_date = db.Column(db.String(128))
	latest_major_action = db.Column(db.String(128))
	sig_ids = db.Column(db.String(33000))

	def __iter__(self):
		for attr, value in self.__dict__.items():
			yield attr, value

class BillSchema(ma.Schema):
	class Meta:
		fields = ('congress', 'bill_id', 'number', 'title', 'short_title',
		          'sponsor_id', 'sponsor_name', 'sponsor_state', 'sponsor_party',
		          'congressdotgov_url', 'introduced_date', 'cosponsors',
		          'committees',
		          'primary_subject', 'summary', 'summary_short', 'latest_major_action_date',
		          'latest_major_action','sig_ids')


bill_schema = BillSchema()
bills_schema = BillSchema(many=True)

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


bill_page = Blueprint('bill_page', __name__)


@bill_page.route('/')
def get_bills():
	limit = request.args.get('limit', default=10000, type=int)
	# sponsor_id for legislator to bill connection
	sponsor_id = request.args.get('sponsor_id', default='', type=str)

	# bill_id for grabbing a single bill
	bill_id = request.args.get('bill_id', default='', type=str)

	# starting index
	start = request.args.get('start', default=0, type=int)

	tgt_state = request.args.get('state', default='', type=str)

	# search query, using + since https doesn't support spaces
	search = request.args.get('search', default='', type=str).replace('+', ' ')

	# sort by url parameter
	sort = request.args.get('sort', default='', type=str)

	all_bills = Bills.query.all()
	if search != '':
		all_bills = findSearchResults(search, all_bills)

	all_legs = Legislators.query.all()
	res = []
	for b in all_bills[start:]:
		if sponsor_id:
			if b.sponsor_id == sponsor_id:
				res.append(b)
		elif bill_id:
			if b.bill_id == bill_id:
				res.append(b)
		elif tgt_state:
			leg = None
			for l in all_legs:
				if l.id == b.sponsor_id:
					leg = l
					break
			if leg!=None and leg.state == tgt_state:
				res.append(b)
		else:
			res.append(b)
		if len(res) >= limit:
			break

	# Sort result if sort is a url parameter
	if (validate_sort(sort, res)):
		res.sort(key=lambda x:dict(x)[sort].replace('\"', '') if dict(x)[sort] != None else "zzzzzz")

	result = bills_schema.dump(res)
	return jsonify(result)

