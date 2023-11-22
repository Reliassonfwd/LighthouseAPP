FactoryBot.define do
  factory :user do
    name {'Hola'}
    email { 'test@example.com' }
    password { 'password' }
    jti { SecureRandom.uuid }
    # Add other fields as necessary
  end
end