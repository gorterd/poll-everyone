class AnswerOption < ApplicationRecord

  KEYS = ('A'..'Z').to_a

  validates :key, :body, presence: true
  validates :key, inclusion: {in: KEYS}

  belongs_to :poll, inverse_of: :answer_options

  after_initialize :ensure_key

  private 

  def ensure_key
    prev = self.poll.last_key

    unless self.key || prev == 'Z'
      self.key = prev.nil? ? 'A' : KEYS[KEYS.index(prev)+1]
    end
  end

end
