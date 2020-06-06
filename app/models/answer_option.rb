class AnswerOption < ApplicationRecord

  validates :body, presence: true

  before_save :ensure_ord

  belongs_to :poll, inverse_of: :answer_options, counter_cache: true

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

  def ensure_ord
    self.ord = self.poll.next_ord
  end

end
