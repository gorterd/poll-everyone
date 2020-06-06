class ChangeAnswerOptionKeyToArrayInPoll < ActiveRecord::Migration[5.2]
  def change
    remove_column :answer_options, :key
    add_column :polls, :ordered_anwer_option_ids, :integer, null:false, array: true, default: []
  end
end
