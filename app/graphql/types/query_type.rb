module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :groups, [Types::GroupType], null: false
    def groups
      require_authorization
      context[:current_user].groups
    end

    field :polls, [Types::PollType], null: false
    def polls
      require_authorization
      context[:current_user].polls
    end

    field :participation, Types::ParticipationType, null: false do
      argument :username, String, required: true
    end
    def participation(username:)
      Participation.find_or_create_by(
        participant_id: context[:current_participant].id, 
        participant_type: context[:current_participant].class.name, 
        presenter_id: User.find_by(username: username).id
      )
    end

    private

    def require_authorization
      unless context[:current_user]
        raise GraphQL::ExecutionError, "Query requires current user" 
      end
    end
  end
end
