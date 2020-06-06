class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def remove_record_id_from_order(record_id)
    self.ordered_record_ids.delete(record_id)
    self.save
  end

  def add_record_id_to_order(record_id)
    self.ordered_record_ids << record_id
    self.save
  end

  def add_record_id_at_pos(record_id, pos)
    return false if pos < 0 || pos > self.ordered_record_ids.size
    self.ordered_record_ids.delete(record_id)
    self.ordered_record_ids.insert(pos, record_id)
  end
end
