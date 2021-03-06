class Response < ApplicationRecord

  validates :body, presence: true

  before_validation :ensure_poll, :ensure_body

  belongs_to :poll, inverse_of: :responses
  belongs_to :answer_option, inverse_of: :responses, optional: true
  belongs_to :participant, inverse_of: :responses

  private

  def ensure_poll
    if self.answer_option && poll_id = self.answer_option.poll_id
      self.poll_id ||= poll_id
    end
  end

  def ensure_body
    if self.answer_option
      self.body ||= answer_option.body
    end
  end

end
