class RemoveCountCacheColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :groups, :polls_count
    remove_column :polls, :answer_options_count
  end
end
