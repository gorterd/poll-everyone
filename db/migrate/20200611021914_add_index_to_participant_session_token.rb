class AddIndexToParticipantSessionToken < ActiveRecord::Migration[5.2]
  def change
    add_index :unregistered_participants, :participant_session_token
  end
end
