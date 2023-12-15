# spec/models/tour_spec.rb

require 'rails_helper'

RSpec.describe Tour, type: :model do
  it { should belong_to(:company) }
  # Agrega aquí más asociaciones según sea necesario

  describe "validations" do
    subject { create(:tour) } # utiliza tu fábrica de Tour
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:description) }
    it { should validate_numericality_of(:duration) }
    it { should validate_numericality_of(:price) }
    it { should validate_numericality_of(:quantity).only_integer }
    # Agrega aquí más validaciones según sea necesario
  end
end