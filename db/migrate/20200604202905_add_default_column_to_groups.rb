class AddDefaultColumnToGroups < ActiveRecord::Migration[5.2]
  def change
    add_column :groups, :default, :boolean, default: false
  end
end
