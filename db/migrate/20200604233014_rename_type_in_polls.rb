class RenameTypeInPolls < ActiveRecord::Migration[5.2]
  def change
    rename_column :polls, :type, :poll_type
  end
end
