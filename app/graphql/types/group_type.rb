module Types
  class GroupType < Types::BaseObject
    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :_id, Integer, null: false, method: :id
    field :title, String, null: false
    field :ord, Integer, null: false
    field :user_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :polls, [Types::PollType], null: true
    field :poll_ids, [Integer], null: true

    field :num_polls, Integer, null: false
    def num_polls
      object.polls.count
    end
  end
end
