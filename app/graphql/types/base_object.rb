module Types
  class BaseObject < GraphQL::Schema::Object
    edge_type_class(Types::BaseEdge)
    connection_type_class(Types::BaseConnection)
    field_class Types::BaseField

    def self.assoc_field(field_name, *args)
      field(field_name, *args)
      define_method(field_name) do 
        dataloader.with(Sources::Association, field_name).load(object)
      end
    end

    def self.assoc_method_field(field_name, assoc_name, *args)
      field(field_name, *args)
      define_method(field_name) do 
        preload(assoc_name, &field_name)
      end
    end

    def self.assoc_size_field(field_name, assoc_name, *args)
      field(field_name, *args)
      define_method(field_name) do 
        preload(assoc_name) { |obj| obj.send(assoc_name).size }
      end
    end

    def preload(assoc_name, &prc)
      dataloader
        .with(Sources::PreloadAssociation, assoc_name)
        .load(object, &prc)
    end

    def query_load(query, foreign_key: nil, default: nil)
      dataloader.with(Sources::Query, query, context, 
        foreign_key: foreign_key, 
        default: default
      ).load(object)
    end
  end
end
