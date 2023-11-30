FactoryBot.define do
  factory :company do
    name { 'Test Company' }
    description { 'This is a test description' }
    address { '123 Test Street' }
    contact_info { 'test@example.com' }
  end
end