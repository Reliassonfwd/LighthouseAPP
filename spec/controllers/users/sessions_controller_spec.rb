require 'rails_helper'

RSpec.describe Users::SessionsController, type: :controller do
  before do
    @request.env["devise.mapping"] = Devise.mappings[:user]
  end

  let(:user) { create(:user) }

  describe "POST #create" do
    context "with valid credentials" do
      it "logs in the user" do
        post :create, params: { user: { email: user.email, password: user.password } }
        expect(response).to have_http_status(:ok)
        expect(response.body).to include('Logged in successfully')
      end
    end

    context "with invalid credentials" do
      it "does not log in the user" do
        post :create, params: { user: { email: user.email, password: 'wrong_password' } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

#   describe "DELETE #destroy" do
#     context "when the user is logged in" do
#     before do
#       # Log in the user
#       sign_in user
#     end

#   #   it "logs out the user" do
#   #     delete :destroy
#   #     expect(response).to have_http_status(:ok)
#   #   end
#   # end

#   it "logs out the user" do
#     delete :destroy, params: { id: user.id }
#     expect(response).to have_http_status(:ok)
#   end
# end

    context "when the user is not logged in" do
      it "does not log out the user" do
        delete :destroy
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end