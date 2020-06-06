class Poll < ApplicationRecord

  POLL_TYPES = ['multiple_choice']

  validates :title, :poll_type, presence: true
  validates :poll_type, inclusion: {in: POLL_TYPES }

  belongs_to :group
  has_one :user, through: :group, source: :user
  has_many :answer_options, inverse_of: :poll, autosave: true, dependent: :destroy
  has_many :correct_answers, -> { where(correct: true) }, foreign_key: :poll, class_name: 'AnswerOption'

  after_initialize :ensure_poll_type

    #REMOVE FOR PRODUCTION
  def self.rp
    # debugger
    self.create!(
      title: ("poll" + rand(100..999).to_s),
      group_id: Group.first.id
    )
  end
  # logic

  def self.move_polls(poll_ids, new_group_id)
    return false unless new_group = Group.find_by(id: new_group_id)
    
    Poll.where(id: poll_ids).includes(:group).each do |poll|
      next if poll.group_id == new_group_id
      poll.group.remove_poll_id_from_order(poll.id)
      poll.group_id = new_group_id
    end
    
    new_group.ordered_poll_ids += poll_ids
    true
  end

  def self.move_poll(poll_id, new_group_id, pos)
    return false unless new_group = Group.find_by(id: new_group_id) && poll = Poll.find_by(id: poll_id)
    
    poll.group_id = new_group_id
    new_group.add_poll_id_at_pos(poll_id, pos)

    true
  end

  def remove_answer_option_id_from_order(answer_option_id)
    self.ordered_answer_option_ids.delete(answer_option_id)
  end

  def add_answer_option_id_to_order(answer_option_id)
    self.ordered_answer_option_ids << answer_option_id
  end

  private

  def ensure_poll_type
    self.poll_type ||= POLL_TYPES.first
  end

end

