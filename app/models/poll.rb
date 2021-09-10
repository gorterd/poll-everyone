class Poll < ApplicationRecord
  POLL_TYPES = ['multiple_choice'].freeze

  include Orderable
  set_ord_container :group

  validates :title, :ord, presence: true
  validates :poll_type, inclusion: { in: POLL_TYPES }
  validate :not_second_active

  before_validation :ensure_poll_type, :ensure_ord, on: :create
  after_destroy :remove_from_container_order # TODO refactor for delete_all

  belongs_to :group
  has_one :user, through: :group, source: :user
  has_many :answer_options, 
    -> { order(:ord) },  
    inverse_of: :poll,
    dependent: :destroy # TODO refactor for delete_all
  accepts_nested_attributes_for :answer_options, allow_destroy: true
  has_many :correct_answers, 
    -> { where(correct: true) }, 
    class_name: 'AnswerOption'
  has_many :responses, dependent: :destroy # TODO refactor for delete_all

  def dup_with_answer_options
    poll_params = [
      :title, 
      :poll_type, 
      :locked, 
      :allow_changes, 
      :allow_anonymous, 
      :num_responses_allowed, 
      :group_id
    ]
    answer_option_params = [
      :body, 
      :correct, 
      :ord
    ]

    new_poll = self.class.new attributes
      .select { |k| poll_params.include?(k.to_sym) }   
    
    new_answer_options_attrs = answer_options.map do |option|
      option.attributes.select { |k| answer_option_params.include?(k.to_sym) } 
    end
    
    new_poll.answer_options.build new_answer_options_attrs
    new_poll
  end

  def update_and_replace_options(new_attributes)
    answer_options_attributes = new_attributes[:answer_options_attributes]
    new_ids = answer_options_attributes.map { |opt| opt[:id] }.compact
    
    deleted_ids = answer_option_ids - new_ids
    deletion_attributes = deleted_ids.map { |id| { _destroy: 1, id: id } }
    answer_options_attributes.concat(deletion_attributes)
    
    update(new_attributes)
  end

  def toggle_active
    if active
      update active: false
      { deactivated: id }
    else
      touched = { activated: id }

      other_active = user.active_poll
      if other_active && self != other_active
        other_active.update active: false 
        touched[:deactivated] = other_active.id
      end

      update active: true
      touched
    end 
  end

  private

  def ensure_poll_type
    self.poll_type ||= POLL_TYPES.first
  end

  def not_second_active
    if active && prev_active = self.user.active_poll
      unless self === prev_active
        self.errors[:active] << ' cannot be applied; another poll is active'
      end
    end
  end
end

