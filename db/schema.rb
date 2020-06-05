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

ActiveRecord::Schema.define(version: 2020_06_05_010847) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answer_options", force: :cascade do |t|
    t.string "key", null: false
    t.string "body", null: false
    t.boolean "correct", default: false, null: false
    t.integer "poll_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["key", "poll_id"], name: "index_answer_options_on_key_and_poll_id", unique: true
    t.index ["poll_id"], name: "index_answer_options_on_poll_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "title", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "default", default: false
    t.index ["user_id"], name: "index_groups_on_user_id"
  end

  create_table "polls", force: :cascade do |t|
    t.string "title", null: false
    t.string "poll_type", null: false
    t.integer "ord", null: false
    t.boolean "locked", default: false, null: false
    t.boolean "allow_changes", default: false, null: false
    t.boolean "allow_anonymous", default: false, null: false
    t.integer "num_responses_allowed", default: 1, null: false
    t.integer "group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_polls_on_group_id"
    t.index ["ord"], name: "index_polls_on_ord"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "activatable_type"
    t.bigint "activatable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.index ["activatable_id", "activatable_type"], name: "index_users_on_activatable_id_and_activatable_type", unique: true
    t.index ["activatable_type", "activatable_id"], name: "index_users_on_activatable_type_and_activatable_id"
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
