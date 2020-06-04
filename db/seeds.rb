# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


demo = User.create(
  first_name: "Truman",
  last_name: "Burbank",
  username: "trumanburbank123",
  email: "isThisTheRealLife@isThisJustFantasy.idk",
  password: "its_all_a_simulation"
)

easy = User.create(
  first_name: "easy",
  last_name: "peasy",
  username: "easy",
  email: "easy@easy.com",
  password: "123123123"
)
