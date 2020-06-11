class CreateUnregisteredParticipants < ActiveRecord::Migration[5.2]
  def change
    create_table :unregistered_participants do |t|
      t.string :participant_session_token, null: false
      t.timestamps
    end
  end
end
