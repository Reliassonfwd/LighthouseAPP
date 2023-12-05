class AddCardDetailsToPaymentMethods < ActiveRecord::Migration[7.0]
  def change
    add_column :payment_methods, :card_name, :string
    add_column :payment_methods, :card_number, :string
    add_column :payment_methods, :expiration_date, :date
    add_column :payment_methods, :cvv, :string
  end
end
