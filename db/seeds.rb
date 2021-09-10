# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

AnswerOption.destroy_all
Poll.destroy_all
Group.destroy_all
User.destroy_all

easy = User.create!(
  first_name: "easy",
  last_name: "easy",
  username: "easy",
  email: "e@e.com",
  password: "123456789"
)

demo = User.create!(
  first_name: "truman",
  last_name: "burbank",
  username: "Truman123",
  email: "goodAfternoon@goodEvening.gn",
  password: "simulation"
)

[easy, demo].each do |user|
  3.times do 
    Group.create! title: Faker::Dessert.variety, user: user
  end
end

Group.all.each do |group|
  3.times do 
    Poll.create!(
      title: Faker::Lorem.question,
      group: group
    )
  end
end

Poll.all.each do |poll|
  rand(2..4).times do 
    AnswerOption.create!(
      body: Faker::Company.bs,
      correct: [true, false].sample,
      poll: poll
    )
  end
end
