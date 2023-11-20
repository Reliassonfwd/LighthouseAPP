# require 'rails_helper'

# RSpec.describe Users::SessionsController, type: :controller do
#   describe "DELETE #destroy" do
#     let(:user) { create(:user) }
#     let(:token) { JwtService.encode({ user_id: user.id }) }

#     before do
#       request.headers['Authorization'] = "Bearer #{token}"
#       delete :destroy
#     end

#     it "returns a 200 status code" do
#       expect(response).to have_http_status(:ok)
#     end

#     it "returns a success message" do
#       expect(response.body).to match(/Logged out successfully/)
#     end
#   end
# end