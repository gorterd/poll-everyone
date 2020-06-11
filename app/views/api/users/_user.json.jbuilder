json.key_format! camelize: :lower
json.extract! user, :id, :username, :email, :first_name, :last_name
json.active_poll_id ( user.active_poll ? user.active_poll.id : nil )