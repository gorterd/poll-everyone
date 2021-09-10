module Types
  class MutationType < Types::Base::Object  
    field :move_polls, mutation: Mutations::Polls::MovePolls
    field :say_hi, mutation: Mutations::Polls::SayHi
  end
end
