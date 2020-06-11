class AddActiveToPoll < ActiveRecord::Migration[5.2]
  def change
    add_column :polls, :active, :boolean, default: false, null:false
  end
end
