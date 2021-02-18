module Mutations::Nodes
  # TODO: complete implementation
  class BatchDestroy < Mutations::BaseMutation
    argument :group_ids, [ID], required: false
    argument :poll_ids, [ID], required: false
    # argument :group_ids, [ID], required: false
    # argument :group_ids, [ID], required: false

    # field :groups, [Types::Object::GroupType], null: false
    # field :errors, [String], null: false

    # def resolve(group_id:, poll_ids:)
    #   unless context[:current_user]
    #     raise GraphQL::ExecutionError, "Query requires current user" 
    #   end

    #   if Poll.move_items(poll_ids, group_id)
    #     { groups: context[:current_user].groups }
    #   else
    #     { errors: "Could not move polls" }
    #   end
    # end
  end
end
