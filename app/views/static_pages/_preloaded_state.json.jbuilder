json.key_format! camelize: :lower

if current_user
  json.entities do
    json.users do
      json.set! current_user.id do
        json.extract! current_user, :id, :username, :email, :first_name, :last_name
      end
    end
  end
  json.session do
    json.current_type 'User'
    json.current_id current_user.id
  end
else
  json.session do
    json.current_type  'UnregisteredParticipant'
    json.current_id current_participant.id
  end
end