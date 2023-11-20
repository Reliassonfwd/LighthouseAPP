require 'rails_helper'

RSpec.describe Users::RegistrationsController, type: :controller do
  before do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  # describe "POST #create" do
  #   context "with valid params" do
  #     let(:valid_attributes) do
  #       { user: { email: 'admin@admin.com', password:'123456789', name:"Hola" } }
  #     end

  #     it "creates a new User" do
  #       expect {
  #         post :create, params: valid_attributes
  #       }.to change(User, :count).by(1)
  #     end

  #     it "returns a 200 status code" do
  #       post :create, params: valid_attributes
  #       expect(response).to have_http_status(:ok)
  #     end
  #   end


    context "with invalid params" do
      let(:invalid_attributes) do
        { user: { email: 'user.com', password: '1234' } }
      end

      it "does not create a new User" do
        expect {
          post :create, params: invalid_attributes
        }.to change(User, :count).by(0)
      end

      it "returns a 422 status code" do
        post :create, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  # end
end