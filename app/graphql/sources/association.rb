class Sources::Association < GraphQL::Dataloader::Source
  def initialize(assoc_name)
    @assoc_name = assoc_name
  end

  def fetch(parent_entities)
    ApplicationRecord.preload! parent_entities, @assoc_name
    parent_entities.map { |entity| entity.send(@assoc_name).to_a }
  end
end