module Types
  class PollType < Types::BaseObject
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

    field :answer_options, [Types::AnswerOptionType], null: true

    field :num_responses, Integer, null: false
    def num_responses
      object.responses.count
    end
  end
end
