require 'rails_helper'

RSpec.describe User, type: :model do
  # it { should have_many(:bookings) }
  # it { should have_many(:comments) }

  it "includes Devise modules" do
    expect(User.ancestors.include?(Devise::JWT::RevocationStrategies::JTIMatcher)).to eq(true)
  end

  it "includes Rolify module" do
    expect(User.ancestors.include?(Rolify::Role)).to eq(true)
  end

  it "is valid with valid attributes" do
    user = User.new(
      email: 'admin@admin.com',
      password: '12345678',
      password_confirmation: '12345678'
    )
    expect(user).to be_valid
  end

  it "is not valid without an email" do
    user = User.new(email: "admin@admin.com")
    expect(user).to_not be_valid
  end


  it "is not valid without a password" do
    user = User.new(password: 12345678)
    expect(user).to_not be_valid
  end
end
