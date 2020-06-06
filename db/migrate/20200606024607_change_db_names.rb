class ChangeDbNames < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :ordered_groups_ids, :ordered_group_ids
    rename_column :groups, :ordered_polls_ids, :ordered_poll_ids
  end
end
