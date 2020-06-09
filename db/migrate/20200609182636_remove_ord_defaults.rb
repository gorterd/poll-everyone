class RemoveOrdDefaults < ActiveRecord::Migration[5.2]
  def change
    change_column_default :answer_options, :correct, from: false, to: nil
    change_column_default :answer_options, :ord, from: 0, to: nil
    change_column_default :groups, :ord, from: 0, to: nil
    change_column_default :polls, :ord, from: 0, to: nil
  end
end
