class Sources::Query < GraphQL::Dataloader::Source
  def initialize(query, context, foreign_key: nil, default: nil)
    @query = query
    @context = context
    @foreign_key = foreign_key
    @default = default
  end

  def fetch(parent_entities)
    @foreign_key ||= parent_entities.first.class.name.foreign_key.to_sym
    entities = @query.call(parent_entities, @context)
    entities = entities.group_by(&@foreign_key) unless entities.is_a? Hash

    parent_entities.map { |parent| entities[parent.id] || @default }
  end
end