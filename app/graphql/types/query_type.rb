module Types
  class QueryType < Types::Base::Object
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :groups, [Types::Object::GroupType], null: false
    def groups
      require_authorization
      context[:current_user].groups
    end

    field :polls, [Types::Object::PollType], null: false
    def polls
      require_authorization
      context[:current_user].polls
    end
    
    field :poll, Types::Object::PollType, null: false do
      argument :id, Integer, required: true
    end
    def poll(id:)
      require_authorization
      Poll.find(id)
    end

    field :participation, Types::Object::ParticipationType, null: false do
      argument :username, String, required: true
    end
    def participation(username:)
      Participation.find_or_create_by(
        participant_id: context[:current_participant].id, 
        participant_type: context[:current_participant].class.name, 
        presenter_id: User.find_by(username: username).id
      )
    end
  end
end
