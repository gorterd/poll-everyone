class ChangeSchemaDefault < ActiveRecord::Migration[5.2]
  def change
    change_column :groups, :ord,:integer, default: 0
    change_column :polls, :ord, :integer, default: 0
    change_column :answer_options, :ord, :integer,default: 0
  end
end
