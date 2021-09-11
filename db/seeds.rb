# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

AnswerOption.destroy_all
Participation.destroy_all
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

respondents = 5.times.map do
  User.create!(
    first_name: "first",
    last_name: "last",
    username: Faker::Internet.username,
    email: Faker::Internet.email,
    password: "password"
  )
end

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
  answer_options = rand(2..4).times.map do 
    AnswerOption.create!(
      body: Faker::Company.bs,
      correct: [true, false].sample,
      poll: poll
    )
  end

  if [true, false].sample
    respondents.sample(rand(0..5)).each do |participant|
      Response.create!(
        answer_option: answer_options.sample,
        participation: Participation.create!(
          participant: participant,
          presenter: poll.user
        )
      )
    end
  end
end