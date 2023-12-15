require 'rails_helper'

RSpec.describe Booking, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:tour) }
  it { should belong_to(:payment) }

  it "has a valid factory" do
    expect(build(:booking)).to be_valid
  end
end