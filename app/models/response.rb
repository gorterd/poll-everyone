class Response < ApplicationRecord
  validates :body, presence: true

  before_validation :ensure_poll, :ensure_body, 
    if: proc { answer_option }, 
    on: :create

  belongs_to :poll
  belongs_to :answer_option, optional: true
  belongs_to :participation

  def participant
    participation.participant
  end

  private

  def ensure_poll
    self.poll_id ||= answer_option.poll_id
  end

  def ensure_body
    self.body ||= answer_option.body
  end
end
