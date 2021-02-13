class CreateParticipations < ActiveRecord::Migration[5.2]
  def change
    create_table :participations do |t|
      t.string :participant_type, null: false
      t.integer :participant_id, null: false
      t.integer :presenter_id, null: false
      t.string :screen_name

      t.timestamps
    end

    add_index :participations, [:participant_type, :participant_id]
    add_index :participations, :presenter_id
  end
end
