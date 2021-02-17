class Sources::Model < GraphQL::Dataloader::Source
  def initialize(model_class)
    @model_class = model_class
  end

  def fetch(ids)
    entities = @model_class.where id: ids
    ids.map { |id| entities.find { |entity| entity.id == id } }
  end
end