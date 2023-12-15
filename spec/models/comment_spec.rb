require 'rails_helper'

RSpec.describe Comment, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.build(:comment)).to be_valid
  end

  it "is invalid without a comment_text" do
    comment = FactoryBot.build(:comment, comment_text: nil)
    expect(comment).not_to be_valid
  end

  it "is invalid without a rating" do
    comment = FactoryBot.build(:comment, rating: nil)
    expect(comment).not_to be_valid
  end

  it "is invalid without a user" do
    comment = FactoryBot.build(:comment, user: nil)
    expect(comment).not_to be_valid
  end

  it "is invalid without a tour" do
    comment = FactoryBot.build(:comment, tour: nil)
    expect(comment).not_to be_valid
  end
end