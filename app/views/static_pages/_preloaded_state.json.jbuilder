json.key_format! camelize: :lower

if current_user
  json.entities do
    json.users do
      json.set! current_user.id do
        json.extract! current_user, :id, :username, :email
      end
    end
  end
end

json.session do
  json.current_type current_user ? 'User' : 'UnregisteredParticipant'
  json.current_id current_user ? current_user.id : current_participant.id
end