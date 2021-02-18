module Types
  class MutationType < Types::Base::Object  
    # include Types::Base::Object::MutationHelpers::Polls
    field :move_polls, mutation: Mutations::Polls::MovePolls
    field :say_hi, mutation: Mutations::Polls::SayHi
    #   argument :group_id, ID, required: true
    #   argument :poll_ids, [ID], required: true
    # end
    # def move_polls(group_id:, poll_ids:)
    #   require_authorization

    #   if Poll.move_items(poll_ids, group_id)
    #     context[:current_user].groups
    #   else
    #     raise GraphQL::ExecutionError, "Could not move polls" 
    #   end
    # end
  end
end
