class Sources::PreloadAssociation < GraphQL::Dataloader::Source
  def initialize(assoc_name)
    @assoc_name = assoc_name
  end

  def fetch(parent_entities)
    ApplicationRecord.preload! parent_entities, @assoc_name
    parent_entities
  end

  def load(key, &prc)
    prc.call super(key)
  end
end