class CreateAnswerOptions < ActiveRecord::Migration[5.2]
  def change
    create_table :answer_options do |t|
      t.string :key, null:false
      t.string :body, null:false
      t.boolean :correct, null:false, default: false
      t.integer :poll_id, null:false, index: true

      t.timestamps
    end

    add_index :answer_options, [:key, :poll_id], unique: true
  end
end
