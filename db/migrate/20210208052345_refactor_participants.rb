class RefactorParticipants < ActiveRecord::Migration[5.2]
  def change
    drop_table :participants
    add_column :responses, :screen_name, :string
    rename_column :responses, :participant_id, :participation_id
  end
end
