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


class Legislators(db.Model):
	id = db.Column(db.String(128), primary_key=True)
	title = db.Column(db.String(128), index=True)
	first_name = db.Column(db.String(128), index=True)
	middle_name = db.Column(db.String(128), index=True)
	last_name = db.Column(db.String(128), index=True)
	date_of_birth = db.Column(db.String(128), index=True)
	gender = db.Column(db.String(128), index=True)
	party = db.Column(db.String(128), index=True)
	twitter_account = db.Column(db.String(128), index=True)
	facebook_account = db.Column(db.String(128), index=True)
	youtube_account = db.Column(db.String(128), index=True)
	votesmart_id = db.Column(db.String(128), index=True, unique=True)
	url = db.Column(db.String(128), index=True)
	seniority = db.Column(db.String(128), index=True)
	state = db.Column(db.String(128), index=True)
	missed_votes_pct = db.Column(db.String(128), index=True)
	votes_with_party_pct = db.Column(db.String(128), index=True)
	votes_against_party_pct = db.Column(db.String(128), index=True)
	sigs_ratings = db.Column(db.String(33000), index=True)

	def __iter__(self):
		for attr, value in self.__dict__.items():
			yield attr, value


# Legislator object Schema
class LegislatorSchema(ma.Schema):
	class Meta:
		# fields = ('id', 'name', 'party', 'spons_bills', 'state', 'dist_num')
		fields = ('id', 'title', 'first_name', 'middle_name', 'last_name',
		          'date_of_birth', 'gender', 'party', 'twitter_account', 'facebook_account',
		          'youtube_account', 'votesmart_id', 'url', 'seniority', 'state',
		          'missed_votes_pct', 'votes_with_party_pct', 'votes_against_party_pct','sigs_ratings')


leg_schema = LegislatorSchema()
legs_schema = LegislatorSchema(many=True)

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


leg_page = Blueprint('leg_page', __name__)


@leg_page.route('/')
def get_legislators():
	limit = request.args.get('limit', default=10000, type=int)

	# leg_id for bill to legislator connection
	leg_id = request.args.get('id', default='', type=str)

	# st for sig to legislators connection
	st = request.args.get('state', default='', type=str)

	# starting index
	start = request.args.get('start', default=0, type=int)

	# search query, using + since https doesn't support spaces
	search = request.args.get('search', default='', type=str).replace('+', ' ')

	# sort by url parameter
	sort = request.args.get('sort', default='', type=str)

	all_legislators = Legislators.query.all()

	if search != '':
		all_legislators = findSearchResults(search, all_legislators)

	res = []
	for lg in all_legislators[start:]:
		# if both leg_id and state are provided, then this double adds. not working like filter, fix later
		if leg_id != '':
			if lg.id == leg_id:
				res.append(lg)
		elif st:
			if lg.state == st:
				res.append(lg)
		else:
			res.append(lg)
		if len(res) >= limit:
			break

	# Sort result if sort is a url parameter
	if validate_sort(sort, res):
		res.sort(key=lambda x: dict(x)[sort])

	result = legs_schema.dump(res)
	return jsonify(result)