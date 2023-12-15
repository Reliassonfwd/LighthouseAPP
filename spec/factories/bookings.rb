# En el archivo spec/factories/bookings.rb
FactoryBot.define do
  factory :booking do
    booking_date { Date.today + 5.days } # Asume que la fecha de reserva es dentro de 5 días
    user
    tour
    payment
  end
end