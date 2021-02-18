module Mutations::Polls
  class MovePolls < Mutations::BaseMutation
    argument :group_id, ID, required: true
    argument :poll_ids, [ID], required: true

    field :groups, [Types::Object::GroupType], null: false
    field :errors, [String], null: false

    def resolve(group_id:, poll_ids:)
      unless context[:current_user]
        raise GraphQL::ExecutionError, "Query requires current user" 
      end

      if Poll.move_items(poll_ids, group_id)
        { groups: context[:current_user].groups }
      else
        { errors: "Could not move polls" }
      end
    end
  end

  class SayHi < Mutations::BaseMutation
    field :hello, String, null: false

    def resolve
      { hello: "hi there!!" }
    end
  end
end
