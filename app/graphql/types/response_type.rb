module Types
  class ResponseType < Types::BaseObject
    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :_id, Integer, null: false, method: :id
    field :body, String, null: false
    field :screen_name, String, null: true
    field :answer_option_id, Integer, null: true
    field :poll_id, Integer, null: false
    field :participation_id, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
