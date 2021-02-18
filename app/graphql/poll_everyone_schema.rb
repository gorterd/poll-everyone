class PollEveryoneSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  use GraphQL::Dataloader

  # Union and Interface Resolution
  def self.resolve_type(abstract_type, obj, context)
    case obj
    when User
      Types::Object::UserType
    when Participation
      Types::Object::ParticipationType
    when Group
      Types::Object::GroupType
    when Poll
      Types::Object::PollType
    when AnswerOption
      Types::Object::AnswerOptionType
    when Response
      Types::Object::ResponseType
    else
      raise "No type for obj: #{obj}"
    end
  end

  # Return a string UUID for `object`
  def self.id_from_object(object, type, context)
    GraphQL::Schema::UniqueWithinType.encode(object.class.name, object.id)
  end

  # Given a string UUID, find the object
  def self.object_from_id(id, context)
    class_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)
    context.dataloader
      .with(Sources::Model, class_name.constantize)
      .load(item_id)
  end
end
