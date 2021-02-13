module Orderable
  extend ActiveSupport::Concern

  class_methods do 
    attr_reader :ord_container

    def move_items(item_ids, new_container_id)
      move_command = update_ords_sql(
        ordered_items_subquery: moved_item_ords(item_ids, new_container_id).to_sql,
        add_to_set_clause: sanitize_sql([<<-SQL, new_container_id ])
          #{ord_container[:foreign_key]} = ?
        SQL
      ) + "RETURNING ordered_items.#{ord_container[:foreign_key]}"

      transaction do
        result = connection.exec_query(move_command, 'Move items')
        container_ids = result.rows.map(&:first).uniq
        cleanup_command = update_ords_sql(
          ordered_items_subquery: reserialized_ords(container_ids).to_sql
        )
        connection.exec_query(cleanup_command, 'Reserialize old containers')
      end
    end

    def max_ord(container_id)
      where(ord_container[:foreign_key] => container_id).maximum(:ord) || 0
    end 

    private 

    def set_ord_container(container)
      @ord_container = container.is_a?(Hash) ? container : { 
        table: container.to_s.tableize, 
        foreign_key: container.to_s.foreign_key,
        model: container.to_s.classify.constantize,
        association: container
      }
    end

    def update_ords_sql(ordered_items_subquery:, add_to_set_clause: "")
      <<-SQL
        WITH 
          ordered_items AS ( #{ordered_items_subquery} )
        UPDATE 
          #{table_name} AS items
        SET
          ord = ordered_items.new_ord 
          #{add_to_set_clause.present? ? ", #{add_to_set_clause}" : ""}
        FROM
          ordered_items
        WHERE 
          items.id = ordered_items.id
      SQL
    end

    def moved_item_ords(item_ids, new_container_id)
      select(sanitize_sql([<<-SQL, max_ord: max_ord(new_container_id)]))
        (:max_ord + ROW_NUMBER() OVER (
          ORDER BY #{ord_container[:table]}.ord, #{table_name}.ord
        )) AS new_ord
      SQL
        .select(:id, ord_container[:foreign_key].to_sym)
        .joins(ord_container[:association])
        .where(id: item_ids)
        .where("#{ord_container[:foreign_key]} <> ?", new_container_id)
    end

    def reserialized_ords(container_ids)
      select(<<-SQL)
        id, ROW_NUMBER() OVER (
          PARTITION BY #{ord_container[:foreign_key]}
          ORDER BY ord
        ) AS new_ord
      SQL
        .where(ord_container[:foreign_key] => container_ids)
    end
  end

  delegate :ord_container, to: :class

  def move_to_container(new_container_id, new_ord = nil)
    if send(ord_container[:foreign_key]) == new_container_id
      new_ord ||= self.class.max_ord(new_container_id)
      move_within_container(new_ord)
    else
      new_ord ||= self.class.max_ord(new_container_id) + 1
      move_to_new_container(new_container_id, new_ord)
    end
  end

  def move_within_container(new_ord)
    foreign_key = ord_container[:foreign_key]
    container_id = send(foreign_key)

    return true if ord == new_ord
    return false unless new_ord.in? 1..self.class.max_ord(container_id)
      
    ords_to_shift, shift_dir = new_ord < ord ?
      [(new_ord..ord - 1), '+'] : [(ord + 1..new_ord), '-']

    self.class.where(foreign_key => container_id, ord: ords_to_shift)
      .or(self.class.where(id: id))
      .update_all(self.class.sanitize_sql([<<-SQL, new_ord: new_ord ]))
        ord = CASE 
          WHEN id = #{id} THEN :new_ord
          ELSE ord #{shift_dir} 1 
        END
      SQL
  end

  def move_to_new_container(new_container_id, new_ord)
    foreign_key = ord_container[:foreign_key]
    old_container_id = send(foreign_key)

    return false if new_container_id == old_container_id
    return false unless new_ord.in? (1..self.class.max_ord(new_container_id) + 1)
    return false unless ord_container[:model].exists? id: new_container_id

    binds = {
      old_ord: ord,
      new_ord: new_ord,
      new_container_id: new_container_id,
      old_container_id: old_container_id
    }
      
    self.class.transaction do
      self.class.where(<<-SQL, binds)
          ( #{foreign_key} = :new_container_id AND ord >= :new_ord )
        OR 
          ( #{foreign_key} = :old_container_id AND ord > :old_ord )
      SQL
        .update_all(self.class.sanitize_sql([<<-SQL, binds]))
          ord = CASE #{foreign_key}
            WHEN :new_container_id THEN ord + 1
            WHEN :old_container_id THEN ord - 1
          END
        SQL

      update! foreign_key => new_container_id, ord: new_ord
    end
  end

  private

  def ensure_ord
    self.ord ||= self.class.max_ord(send(ord_container[:foreign_key])) + 1
  end

  def remove_from_container_order
    unless destroyed_by_association
      self.class.where('ord > ?', ord)
        .where(ord_container[:foreign_key] => send(ord_container[:foreign_key]))
        .update_all('ord = ord - 1')
    end
  end
end