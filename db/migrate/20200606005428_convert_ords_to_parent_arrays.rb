class ConvertOrdsToParentArrays < ActiveRecord::Migration[5.2]
  def change
    remove_column :groups, :ord
    remove_column :polls, :ord
    add_column :users, :ordered_groups_ids, :integer, null:false, array: true, default: []
    add_column :groups, :ordered_polls_ids, :integer, null:false, array: true, default: []
  end
end
