class CreatePresentationParticipants < ActiveRecord::Migration[5.2]
  def change
    create_table :participants do |t|
      t.string :screen_name
      t.integer :presenter_id, null: false, index: true
      t.references :participatable, null: false, polymorphic: true
      t.timestamps
    end
  end
end
