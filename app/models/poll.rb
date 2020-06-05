class Poll < ApplicationRecord

  POLL_TYPES = ['multiple_choice']

  validates :title, :poll_type, :ord, presence: true
  validates :poll_type, inclusion: {in: POLL_TYPES }

  belongs_to :group
  has_one :user, through: :group, source: :user
  has_many :answer_options, inverse_of: :poll, autosave: true, dependent: :destroy
  has_many :correct_answers, -> { where(correct: true) }, foreign_key: :poll, class_name: 'AnswerOption'

  after_initialize :ensure_ord, :ensure_poll_type

  def ordered_answer_option_ids
    self.answer_options.order(:key).pluck(:id)
  end

  def last_key
    self.answer_options.order(key: :desc).limit(1).pluck(:key).first
  end

  private

  def ensure_ord
    self.ord ||= (self.group.last_poll_ord || 0) + 1
  end

  def ensure_poll_type
    self.poll_type ||= POLL_TYPES.first
  end

end

