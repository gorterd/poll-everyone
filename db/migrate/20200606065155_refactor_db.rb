class RefactorDb < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :ordered_group_ids
    remove_column :groups, :ordered_poll_ids
    remove_column :polls, :ordered_answer_option_ids

    add_column :groups, :ord, :integer, null: false, default: 1, index: true
    add_column :polls, :ord, :integer, null: false, default: 1, index: true
    add_column :answer_options, :ord, :integer, null: false, default: 1, index: true

  end
end
