class FixTypo < ActiveRecord::Migration[5.2]
  def change
    rename_column :polls, :ordered_anwer_option_ids, :ordered_answer_option_ids
  end
end
