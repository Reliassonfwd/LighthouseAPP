class AddQuantityAndIncludesToTours < ActiveRecord::Migration[7.0]
    def change
      add_column :tours, :quantity, :integer
      add_column :tours, :includes, :string
    end
end
