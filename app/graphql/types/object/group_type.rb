module Types::Object
  class GroupType < Types::Base::Object
    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :_id, Integer, null: false, method: :id
    field :title, String, null: false
    field :ord, Integer, null: false
    field :user_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    assoc_field :polls, [Types::Object::PollType], null: true
    assoc_size_field :num_polls, :polls, Integer, null: false
    assoc_method_field :poll_ids, :polls, [Integer], null: true
  end
end
