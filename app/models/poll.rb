class Poll < ApplicationRecord

  POLL_TYPES = ['multiple_choice']

  validates :title, :poll_type, :ord, presence: true
  validates :poll_type, inclusion: {in: POLL_TYPES }
  validate :not_second_active

  before_validation :ensure_poll_type, :ensure_ord, on: [:create]
  after_destroy :remove_from_order

  belongs_to :group, inverse_of: :polls, counter_cache: true
  has_one :user, through: :group, source: :user
  has_many :answer_options, inverse_of: :poll, autosave: true, dependent: :destroy
  accepts_nested_attributes_for :answer_options, allow_destroy: true
  has_many :correct_answers, -> { where(correct: true) }, foreign_key: :poll, class_name: 'AnswerOption'
  has_many :responses, dependent: :destroy

  def self.move_polls(poll_ids, new_group_id)    
    return false unless new_group = Group.find_by(id: new_group_id)

    new_ord = new_group.next_ord
    
    Poll.transaction do 
      Poll.where(id: poll_ids).includes(:group).each do |poll|
        next if poll.group_id == new_group_id
        poll.group.remove_poll_from_order(poll.id)
        poll.update!(group_id: new_group_id, ord: new_ord)
        new_ord += 1
      end
    end

    true
  rescue 
    false
  end

  def self.move_poll(poll_id, new_group_id, pos)
    new_group = Group.find_by(id: new_group_id)
    poll = Poll.find_by(id: poll_id)
    return false unless ( new_group && poll )
    
    Poll.transaction do
      new_group.insert_poll_at_pos(poll_id, pos)
      unless poll.group == new_group
        poll.group.remove_poll_from_order(poll_id)
        poll.update!(group_id: new_group_id)
      end
    end
    true

    rescue
      false
  end

  def self.dup_with_answer_options(poll)
    poll_params = [:title, :poll_type, :locked, :allow_changes, :allow_anonymous, :num_responses_allowed, :group_id]
    answer_option_params = [:body, :correct, :ord]

    new_poll = Poll.new poll.attributes.select { |k| poll_params.include?(k.to_sym) }   
    new_answer_options_attrs = poll.answer_options.map do |option|
      option.attributes.select { |k| answer_option_params.include?(k.to_sym) } 
    end
    
    new_poll.answer_options.build(new_answer_options_attrs)
    new_poll
  end

  def ordered_answer_options
    self.answer_options.order(:ord)
  end

  def ordered_answer_option_ids
    self.ordered_answer_options.pluck(:id)
  end

  def next_ord
    self.answer_options.size
  end

  def remove_answer_option_from_order(answer_option_id)
    new_order = self.ordered_answer_option_ids
    new_order.delete(answer_option_id)
    update_ords(new_order, Answer0ption)
  end

  def insert_answer_option_at_pos(answer_option_id, pos)
    return false if pos < 1 || pos > self.next_ord

    new_order = self.ordered_answer_option_ids
    new_order.delete(answer_option_id)
    new_order.insert(answer_option_id, pos)

    self.update_ords(new_order, Answer0ption)
  end

  private

  def ensure_poll_type
    self.poll_type ||= POLL_TYPES.first
  end

  def ensure_ord
    self.ord = self.group.next_ord
  end

  def remove_from_order
    self.group.remove_poll_from_order(self.id) unless self.destroyed_by_association
  end

  def not_second_active
    if self.user.active_poll && self.active
      self.errors[:active] << ' cannot be applied; another poll is active'
    end
  end
end

