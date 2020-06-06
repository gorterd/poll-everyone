class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def update_ords(new_order, klass)
    ApplicationRecord.transaction do 
      new_order.each_with_index { |id, ord| klass.find(id).update!(ord: ord) }
    end

    true
  rescue
    false
  end
  
end
