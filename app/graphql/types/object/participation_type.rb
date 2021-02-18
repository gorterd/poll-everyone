module Types::Object
  class ParticipationType < Types::Base::Object
    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :_id, Integer, null: false, method: :id
    field :participant_type, String, null: false
    field :participant_id, Integer, null: false
    field :presenter_id, Integer, null: false
    field :screen_name, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :presenter, Types::Object::UserType, null: true
    field :own_responses, [Types::Object::ResponseType], null: true, method: :responses

    field :num_own_responses, Integer, null: false
    def num_own_responses
      object.responses.count
    end

    field :active_poll, Types::Object::PollType, null: true
    def active_poll
      object.presenter.active_poll
    end
  end
end
