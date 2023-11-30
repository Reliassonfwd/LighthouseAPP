FactoryBot.define do
  factory :tour do
    name { 'Test Tour' }
    description { 'This is a test tour' }
    duration { 2.5 }
    price { 100.0 }
    availability { true }
    company
    quantity { 10 }
    includes { 'Test includes' }
  end
end