class ChangeDefaultToOrdInGroups < ActiveRecord::Migration[5.2]
  def change
    remove_column :groups, :default
    add_column :groups, :ord, :integer
  end
end
