class AnswerOption < ApplicationRecord


  validates :body, presence: true

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

end
