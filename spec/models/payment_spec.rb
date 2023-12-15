# En el archivo spec/models/payment_spec.rb
require 'rails_helper'

RSpec.describe Payment, type: :model do
  # it { should belong_to(:user) }
  it { should have_many(:bookings).dependent(:destroy) }

  describe 'private methods' do
    context '#encode_sensitive_data' do
      it 'encodes card number and cvv' do
        payment = build(:payment, card_number: '4111111111111111', cvv: '123')
        payment.send(:encode_sensitive_data)
        expect(payment.card_number).to eq(Base64.strict_encode64('4111111111111111'))
        expect(payment.cvv).to eq(Base64.strict_encode64('123'))
      end
    end

    context '#decode_sensitive_data' do
      it 'decodes card number and cvv' do
        payment = build(:payment, card_number: Base64.strict_encode64('4111111111111111'), cvv: Base64.strict_encode64('123'))
        payment.send(:decode_sensitive_data)
        expect(payment.card_number).to eq('4111111111111111')
        expect(payment.cvv).to eq('123')
      end
    end
  end
end