# spec/models/user_spec.rb
require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:bookings) }
  it { should have_many(:comments) }

  it "includes Devise modules" do
    expect(User.ancestors.include?(Devise::JWT::RevocationStrategies::JTIMatcher)).to eq(true)
  end

  it "includes Rolify module" do
    expect(User.ancestors.include?(Rolify::Role)).to eq(true)
  end

  it "is valid with valid attributes" do
    user = FactoryBot.build(:user)
    expect(user).to be_valid
  end

  it "is not valid without an email" do
    user = FactoryBot.build(:user, email: nil)
    expect(user).to_not be_valid
  end

  it "is not valid without a password" do
    user = FactoryBot.build(:user, password: nil)
    expect(user).to_not be_valid
  end

  it "returns true if the user has the role of admin" do
    user = FactoryBot.create(:user)
    user.add_role :admin

    expect(user.admin?).to be true
  end

  it "returns false if the user does not have the role of admin" do
    user = FactoryBot.create(:user)

    expect(user.admin?).to be false
  end
  
end