from io import StringIO
from unittest import main, TestCase
import requests
# from .application import db_url

url_headers = {
	"Content-Type": "application/json"
}


class TestBackend(TestCase):
	def test_bills_1(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/bills?limit=10", headers=url_headers)
		self.assertEqual(len(resp.json()), 10)

	def test_bills_2(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/bills?sponsor_id=A000360", headers=url_headers)
		rj = (resp.json())
		self.assertEqual(len(resp.json()), 9)
		self.assertEqual(rj[0]['sponsor_name'], "Lamar Alexander")

	def test_bills_3(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/bills?bill_id=hconres10-116", headers=url_headers)
		rj = (resp.json())
		self.assertEqual(len(resp.json()), 1)
		self.assertEqual(rj[0]['number'], "H.CON.RES.10")

	def test_bills_4(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/bills?state=TX&limit=10", headers=url_headers)
		rj = (resp.json())
		self.assertEqual(len(resp.json()), 10)

	def test_bills_search(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/bills?search=nuclear+energy", headers=url_headers)
		rj = resp.json()
		self.assertEqual(len(rj), 28)

	def test_bills_sort(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/bills?sort=short_title&limit=500", headers=url_headers)
		rj = resp.json()
		self.assertEqual(rj[0]['sponsor_name'], "Ed Case")

	def test_sigs_1(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/sigs?limit=10", headers=url_headers)
		self.assertEqual(len(resp.json()), 10)

	def test_sigs_2(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/sigs?state=TX&limit=10", headers=url_headers)
		rj = (resp.json())
		self.assertEqual(len(resp.json()), 4)
		self.assertEqual(rj[0]['name'], "American College of Emergency Physicians")

	def test_sigs_3(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/sigs?sig_id=1189", headers=url_headers)
		rj = (resp.json())
		self.assertEqual(len(resp.json()), 1)

	def test_sigs_search(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/sigs?search=education+health", headers=url_headers)
		rj = resp.json()
		self.assertEqual(len(rj), 18)

	def test_sigs_sort(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/sigs?sort=name&limit=500", headers=url_headers)
		rj = resp.json()
		self.assertEqual(rj[0]['phone1'], "703-689-2270")


	def test_legs_1(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/legislators?limit=10", headers=url_headers)
		self.assertEqual(len(resp.json()), 10)

	def test_legs_2(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/legislators?state=TX", headers=url_headers)
		rj = (resp.json())
		self.assertEqual(len(resp.json()), 38)

	def test_legs_3(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/legislators?id=C001098", headers=url_headers)
		rj = (resp.json())
		self.assertEqual(len(resp.json()), 1)
		self.assertEqual(rj[0]['first_name'], "Ted")

	def test_legs_search(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/legislators?search=cortez+d", headers=url_headers)
		rj = resp.json()
		self.assertEqual(len(rj), 2)

	def test_legs_sort(self):
		base = "https://api.policyand.me"
		resp = requests.get(base + "/legislators?sort=first_name&limit=600", headers=url_headers)
		rj = resp.json()
		self.assertEqual(rj[2]['first_name'], "Abby")



if __name__ == '__main__':
	main()