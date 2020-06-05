class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :title, null:false
      t.integer :user_id, null:false, index: true

      t.timestamps
    end
  end
end
