class ChangeDefault < ActiveRecord::Migration[5.2]
  def change
    change_column_default :polls, :num_responses_allowed, from: 1, to: 3
  end
end
