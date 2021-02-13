# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_08_052345) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answer_options", force: :cascade do |t|
    t.string "body", null: false
    t.boolean "correct", null: false
    t.integer "poll_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "ord", null: false
    t.index ["poll_id"], name: "index_answer_options_on_poll_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "title", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "ord", null: false
    t.index ["user_id"], name: "index_groups_on_user_id"
  end

  create_table "participations", force: :cascade do |t|
    t.string "participant_type", null: false
    t.integer "participant_id", null: false
    t.integer "presenter_id", null: false
    t.string "screen_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["participant_type", "participant_id"], name: "index_participations_on_participant_type_and_participant_id"
    t.index ["presenter_id"], name: "index_participations_on_presenter_id"
  end

  create_table "polls", force: :cascade do |t|
    t.string "title", null: false
    t.string "poll_type", null: false
    t.boolean "locked", default: false, null: false
    t.boolean "allow_changes", default: false, null: false
    t.boolean "allow_anonymous", default: false, null: false
    t.integer "num_responses_allowed", default: 3, null: false
    t.integer "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "ord", null: false
    t.boolean "active", default: false, null: false
    t.index ["group_id"], name: "index_polls_on_group_id"
  end

  create_table "responses", force: :cascade do |t|
    t.string "body", null: false
    t.integer "participation_id", null: false
    t.integer "poll_id", null: false
    t.integer "answer_option_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "screen_name"
    t.index ["answer_option_id"], name: "index_responses_on_answer_option_id"
    t.index ["participation_id"], name: "index_responses_on_participation_id"
    t.index ["poll_id"], name: "index_responses_on_poll_id"
  end

  create_table "unregistered_participants", force: :cascade do |t|
    t.string "participant_session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["participant_session_token"], name: "index_unregistered_participants_on_participant_session_token"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.integer "groups_count"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
