class AnswerOption < ApplicationRecord

  validates :body, presence: true

  before_validation :ensure_ord, on: [:create]

  belongs_to :poll, inverse_of: :answer_options, counter_cache: true
  has_many :responses, inverse_of: :answer_option, dependent: :destroy

  # logic
  
  private

  def ensure_ord
    self.ord ||= self.poll.next_ord
  end

end
