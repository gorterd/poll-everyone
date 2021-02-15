class PollEveryoneSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  # Union and Interface Resolution
  def self.resolve_type(abstract_type, obj, ctx)
    case obj
    when Group
      Types::GroupType
    when Poll
      Types::PollType
    when AnswerOption
      Types::AnswerOptionType
    when Response
      Types::ResponseType
    else
      raise "No type for obj: #{obj}"
    end
  end

  # Return a string UUID for `object`
  def self.id_from_object(object, type_definition, query_ctx)
    GraphQL::Schema::UniqueWithinType.encode(object.class.name, object.id)
  end

  # Given a string UUID, find the object
  def self.object_from_id(id, query_ctx)
    class_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)
    class_name.constantize.find(item_id)
  end
end
