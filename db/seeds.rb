# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'


10.times do 
  User.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.safe_email,
    password: "123456789"
  )
end

user_ids = User.all.pluck(:id)

user_ids.each do |user_id|
  2.times do 
    Group.create!(
    title: Faker::Book.title,
    user_id: user_id
    )
  end
end

group_ids = Group.all.pluck(:id)

group_ids.each do |group_id|
  3.times do 
    Poll.create!(
      title: Faker::Lorem.question,
      group_id: group_id
    )
  end
end

poll_ids = Poll.all.pluck(:id)

poll_ids.each do |poll_id|
  4.times do 
    AnswerOption.create!(
      body: Faker::Lorem.sentence,
      correct: [true, false].sample,
      poll_id: poll_id
    )
  end
end

easy = User.create!(
  first_name: "easy",
  last_name: "peasy",
  username: "easy",
  email: "e@e.com",
  password: "123123123"
)

demo = User.create!(
  first_name: "Truman",
  last_name: "Burbank",
  username: "trumanburbank123",
  email: "isThisTheRealLife@isThisJustFantasy.idk",
  password: "its_all_a_simulation"
)