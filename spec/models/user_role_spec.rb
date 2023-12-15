# spec/models/user_role_spec.rb
require 'rails_helper'

RSpec.describe UserRole, type: :model do
  it "has a valid factory" do
    user = FactoryBot.create(:user)
    role = FactoryBot.create(:role)
    user_role = FactoryBot.build(:user_role, user: user, role: role)
    expect(user_role).to be_valid
  end

  it "is invalid without a user" do
    user_role = FactoryBot.build(:user_role, user: nil)
    expect(user_role).not_to be_valid
  end

  it "is invalid without a role" do
    user_role = FactoryBot.build(:user_role, role: nil)
    expect(user_role).not_to be_valid
  end
end
