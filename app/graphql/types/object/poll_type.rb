module Types::Object
  class PollType < Types::Base::Object
    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :_id, Integer, null: false, method: :id
    field :title, String, null: false
    field :ord, Integer, null: false
    field :active, Boolean, null: false
    field :poll_type, String, null: false
    field :locked, Boolean, null: false
    field :allow_changes, Boolean, null: false
    field :allow_anonymous, Boolean, null: false
    field :num_responses_allowed, Integer, null: false
    field :group_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    assoc_field :answer_options, [Types::Object::AnswerOptionType], null: true 
    assoc_method_field :answer_option_ids, :answer_options, Integer, null: true 
    assoc_size_field :num_responses, :responses, Integer, null: false
  end
end
