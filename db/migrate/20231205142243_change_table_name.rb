class ChangeTableName < ActiveRecord::Migration[7.0]
  def change
    rename_table :payment_methods, :payments
  end
end
