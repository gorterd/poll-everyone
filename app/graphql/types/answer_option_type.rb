module Types
  class AnswerOptionType < Types::BaseObject
    NUM_OWN_RESPONSES_PROC = proc do |answer_options, context|
      Response
        .joins(:participation)
        .where(answer_option_id: answer_options.map(&:id), participations: { 
          participant_id: context[:current_participant].id,
          participant_type: context[:current_participant].class.name,
        })
        .group(:answer_option_id)
        .count
    end

    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :_id, Integer, null: false, method: :id
    field :body, String, null: false
    field :ord, Integer, null: false
    field :correct, Boolean, null: false
    field :poll_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    assoc_field :responses, [Types::ResponseType], null: true
    assoc_size_field :num_responses, :responses, Integer, null: false

    field :num_own_responses, Integer, null: true 

    def num_own_responses
      query_load NUM_OWN_RESPONSES_PROC, default: 0
    end
  end
end
