# require 'rails_helper'
# require 'devise'
# include Devise::Test::ControllerHelpers

# RSpec.describe Api::V1::UsersController, type: :controller do
#   let(:user) { create(:user) }

#   describe "GET #index" do
#     before do
#       sign_in user
#       get :index
#     end

#     it "returns a 200 status code" do
#       expect(response).to have_http_status(:ok)
#     end

#     it "returns all users" do
#       expect(JSON.parse(response.body).size).to eq(User.count)
#     end
#   end

#   describe "GET #show" do
#     context "when the user exists" do
#       before do
#         get :show, params: { id: user.id }
#       end

#       it "returns a 200 status code" do
#         expect(response).to have_http_status(:ok)
#       end

#       it "returns the user" do
#         expect(JSON.parse(response.body)["id"]).to eq(user.id)
#       end
#     end

#     context "when the user does not exist" do
#       it "returns a 404 status code" do
#         get :show, params: { id: 99999 }
#         expect(response).to have_http_status(:not_found)
#       end
#     end
#   end

#   # Add similar blocks for #create, #update, and #destroy actions
# end







# # require 'rails_helper'

# # RSpec.describe Api::V1::UsersController, type: :controller do
# #   let(:user) { create(:user) }

# #   describe "GET #index" do
# #     before do
# #       get :index
# #     end

# #     it "returns a 200 status code" do
# #       expect(response).to have_http_status(:ok)
# #     end

# #     it "returns all users" do
# #       expect(JSON.parse(response.body).size).to eq(User.count)
# #     end
# #   end

# #   describe "GET #show" do
# #     before do
# #       get :show, params: { id: user.id }
# #     end

# #     it "returns a 200 status code" do
# #       expect(response).to have_http_status(:ok)
# #     end

# #     it "returns the user" do
# #       expect(JSON.parse(response.body)["id"]).to eq(user.id)
# #     end
# #   end

# #   # Add similar blocks for #create, #update, and #destroy actions
# # end