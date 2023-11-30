FactoryBot.define do
  factory :user do
    name {'Hola'}
    email { 'test@example.com' }
    password { 'password' }
    jti { SecureRandom.uuid }
  end

  factory :admin, parent: :user do
    after(:create) { |user| user.add_role :admin }
  end
end