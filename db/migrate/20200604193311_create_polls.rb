class CreatePolls < ActiveRecord::Migration[5.2]
  def change
    create_table :polls do |t|
      t.string :title, null:false
      t.string :type, null:false
      t.integer :ord, null:false, index: true
      t.boolean :locked, null:false, default: false
      t.boolean :allow_changes, null:false, default: false
      t.boolean :allow_anonymous, null:false, default: false
      t.integer :num_responses_allowed, null:false, default: 1
      t.integer :group_id, null:false, index: true

      t.timestamps
    end
  end
end
