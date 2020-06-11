class CreateResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :responses do |t|
      t.string :body, null: false
      t.integer :participant_id, null:false, index: true
      t.integer :poll_id, null:false, index: true
      t.integer :answer_option_id, index: true

      t.timestamps
    end
  end
end
