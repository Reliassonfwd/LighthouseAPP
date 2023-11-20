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
end