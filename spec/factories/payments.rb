FactoryBot.define do
  factory :payment do
    payment_type { ["credit_card", "debit_card", "paypal"].sample } # Asume que estos son tipos de pago válidos
    card_name { "John Doe" } # Asume que este es un nombre de tarjeta válido
    card_number { Base64.strict_encode64('4111111111111111') } # Ejemplo de número de tarjeta
    expiration_date { 1.year.from_now } # Asume que la tarjeta expira en un año a partir de ahora
    cvv { Base64.strict_encode64('123') } # Ejemplo de CVV
  end
end