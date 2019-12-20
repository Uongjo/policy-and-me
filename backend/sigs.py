from flask import Blueprint, Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import pymysql

# init app
application = Flask(__name__)
db_url = "mysql+pymysql://admin:adminswe@dev-test.cklbf2vta3cx.us-east-2.rds.amazonaws.com:3306/innodb"

application.config['SQLALCHEMY_DATABASE_URI'] = db_url
application.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(application)
ma = Marshmallow(application)

class Sigs(db.Model):
	sigId = db.Column(db.String(128), primary_key=True)
	name = db.Column(db.String(128))
	description = db.Column(db.String(128))
	address = db.Column(db.String(128))
	city = db.Column(db.String(128))
	state = db.Column(db.String(128))
	zip = db.Column(db.String(128))
	phone1 = db.Column(db.String(128))
	phone2 = db.Column(db.String(128))
	fax = db.Column(db.String(128))
	email = db.Column(db.String(128))
	url = db.Column(db.String(128))
	sig_subjects = db.Column(db.String(128))
	bill_ids = db.Column(db.String(33000))
	legislator_ratings = db.Column(db.String(33000))

	def __iter__(self):
		for attr, value in self.__dict__.items():
			yield attr, value


class SigSchema(ma.Schema):
	class Meta:
		fields = ('sigId', 'name', 'description', 'address', 'city', 'state',
		          'zip', 'phone1', 'phone2', 'fax', 'email', 'url','sig_subjects','bill_ids','legislator_ratings')


sig_schema = SigSchema()
sigs_schema = SigSchema(many=True)

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


sig_page = Blueprint('sig_page', __name__)


@sig_page.route('/')
def get_sigs():
	# limit = request.json['limit']
	limit = request.args.get('limit', default=10000, type=int)

	# st is for legislator to sig connection
	st = request.args.get('state', default='', type=str)

	# sig_id is for a specific interest group
	sig_id = request.args.get('sig_id', default='', type=str)

	# starting index
	start = request.args.get('start', default=0, type=int)

	# search query, using + since https doesn't support spaces
	search = request.args.get('search', default='', type=str).replace('+', ' ')

	# sort by url parameter
	sort = request.args.get('sort', default='', type=str)

	all_sigs = Sigs.query.all()
	if search!='':
		all_sigs = findSearchResults(search, all_sigs)

	res = []
	for s in all_sigs[start:]:
		if st:
			if s.state == st:
				res.append(s)
		elif sig_id:
			if s.sigId == sig_id:
				res.append(s)
		else:
			res.append(s)
		if len(res) >= limit:
			break

	# Sort result if sort is a url parameter
	if (validate_sort(sort, res)):
		res.sort(key=lambda x:dict(x)[sort])

	result = sigs_schema.dump(res)
	return jsonify(result)