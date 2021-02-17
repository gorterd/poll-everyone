module Types
  class AnswerOptionType < Types::BaseObject
    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :_id, Integer, null: false, method: :id
    field :body, String, null: false
    field :ord, Integer, null: false
    field :correct, Boolean, null: false
    field :poll_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :responses, [Types::ResponseType], null: true

    field :num_responses, Integer, null: false
    def num_responses
      object.responses.count
    end

    field :num_own_responses, Integer, null: false 
    def num_own_responses
      Response
        .joins(:participation)
        .where(answer_option_id: object.id, participations: { 
          participant_id: context[:current_participant].id,
          participant_type: context[:current_participant].class.name,
        })
        .count
    end
  end
end
