class CreateTours < ActiveRecord::Migration[7.0]
  def change
    create_table :tours do |t|

      t.string :name 
      t.text :description 
      t.string :duration
      t.integer :price
      t.boolean :availability


      t.timestamps
    end
  end
end
