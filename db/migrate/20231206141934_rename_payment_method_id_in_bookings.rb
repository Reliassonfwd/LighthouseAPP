class RenamePaymentMethodIdInBookings < ActiveRecord::Migration[6.0]
  def change
    rename_column :bookings, :payment_method_id, :payment_id
  end
end