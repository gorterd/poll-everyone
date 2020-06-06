class AnswerOption < ApplicationRecord

  validates :body, presence: true

  after_save :add_to_ordered_answer_option_ids, if: :saved_change_to_poll_id

  belongs_to :poll, inverse_of: :answer_options

#REMOVE FOR PRODUCTION
  def self.ra()
  # debugger
    self.create!(
      body: ("answer_option" + rand(100..999).to_s),
      poll_id: Poll.first.id
    )
  end
  # logic
  
  private

  def add_to_ordered_answer_option_ids
    self.poll.update!(ordered_answer_option_ids: self.poll.ordered_answer_option_ids.push(self.id))
  end

end
