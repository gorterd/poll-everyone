class RemoveActivatableFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :activatable_type
    remove_column :users, :activatable_id
  end
end
