class AnswerOption < ApplicationRecord
  include Orderable
  set_ord_container :poll

  validates :body, presence: true

  before_validation :ensure_ord, on: :create

  belongs_to :poll, inverse_of: :answer_options
  has_many :responses, dependent: :destroy
end
