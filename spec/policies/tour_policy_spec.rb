# spec/policies/tour_policy_spec.rb

require 'rails_helper'

RSpec.describe TourPolicy do
  subject { described_class.new(user, tour) }

  let(:tour) { create(:tour) }

  context 'for a regular user' do
    let(:user) { create(:user) }

    it { is_expected.to forbid_action(:create) }
    it { is_expected.to forbid_action(:update) }
    it { is_expected.to forbid_action(:destroy) }
  end

  context 'for an admin user' do
    let(:user) { create(:admin) }

    it { is_expected.to permit_action(:create) }
    it { is_expected.to permit_action(:update) }
    it { is_expected.to permit_action(:destroy) }
  end
end