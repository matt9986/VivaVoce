# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Business.create!(name: "Jebs",
	street_address: "444 Spinnow Pt",
	city: "San Francisco",
	state: "Ca",
	zip: "94114")
Business.create!(name: "Helpers",
	street_address: "555 Spinnow Pt",
	city: "San Francisco",
	state: "Ca",
	zip: "94114")
Business.create!(name: "Tender Mercy",
	street_address: "666 Spinnow Pt",
	city: "San Francisco",
	state: "Ca",
	zip: "94114")