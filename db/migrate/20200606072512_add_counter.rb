class AddCounter < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :groups_count, :integer
    add_column :groups, :polls_count, :integer
    add_column :polls, :answer_options_count, :integer
  end
end
