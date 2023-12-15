# spec/models/company_spec.rb
require 'rails_helper'

RSpec.describe Company, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.build(:company)).to be_valid
  end

  it "can have many tours" do
    company = FactoryBot.create(:company)
    tour1 = FactoryBot.create(:tour, company: company)
    tour2 = FactoryBot.create(:tour, company: company)

    expect(company.tours).to include(tour1, tour2)
  end

  it "destroys associated tours when it is destroyed" do
    company = FactoryBot.create(:company)
    tour = FactoryBot.create(:tour, company: company)

    company.destroy

    expect(Tour.find_by(id: tour.id)).to be_nil
  end
end