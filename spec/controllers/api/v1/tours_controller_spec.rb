require 'rails_helper'

RSpec.describe Api::V1::ToursController, type: :controller do
  describe "POST #create" do
    let(:company) { create(:company) }
    let(:valid_attributes) { attributes_for(:tour, company_id: company.id) }
    let(:invalid_attributes) { { name: nil } }

    context "when the tour is successfully created" do
      it "returns a success message and a 201 status code" do
        post :create, params: { tour: valid_attributes }
        expect(response.body).to include('Image was successfully attached.')
        expect(response).to have_http_status(201) # 201 Created
      end
    end
    context "when the tour fails to create" do
      it "returns an error message and a 422 status code" do
        post :create, params: { tour: invalid_attributes }
        expect(response.body).to include('Failed to create tour')
        expect(response).to have_http_status(422) # 422 Unprocessable Entity
      end
    end
  end

  describe "PUT #update" do
    let(:tour) { create(:tour) }

    context "when the tour is successfully updated" do
      it "returns an error message and a 422 status code" do
        put :update, params: { id: tour.id, tour: { name: nil } }
        expect(response.body).to include('Failed to update tour')
        expect(response).to have_http_status(422) # 422 Unprocessable Entity
      end
    end

    context "when the tour fails to update" do
      it "returns an error message and a 422 status code" do
        delete :destroy, params: { id: tour.id }
        expect(response.body).to include('Failed to destroy tour')
        expect(response).to have_http_status(422) # 422 Unprocessable Entity
      end
    end
  end

  describe "DELETE #destroy" do
    let(:tour) { create(:tour) }

    context "when the tour fails to destroy" do
      it "returns an error message and a 422 status code" do
        allow_any_instance_of(Tour).to receive(:destroy).and_return(false)
        delete :destroy, params: { id: tour.id }
        expect(response.body).to include('Failed to destroy tour')
        expect(response.body).to include('message') # Make sure the error message is present
        expect(response).to have_http_status(422) # 422 Unprocessable Entity
      end
    end

    context "when the tour fails to destroy" do
      it "returns an error message and a 422 status code" do
        allow_any_instance_of(Tour).to receive(:destroy).and_return(false)
        delete :destroy, params: { id: tour.id }
        expect(response.body).to include('Failed to destroy tour')
        expect(response.body).to include('message') # Make sure the error message is present
        expect(response).to have_http_status(422) # 422 Unprocessable Entity
      end
    end
  end

  describe "POST #add_image" do
    let(:tour) { create(:tour) }
    let(:image_file) { fixture_file_upload(Rails.root.join('spec', 'fixtures', 'files', 'image.jpg'), 'image/jpg') }

    context "when the image is successfully added" do
      it "returns a success message and a 200 status code" do
        post :add_image, params: { id: tour.id, image: image_file }
        expect(response.body).to include('Image was successfully attached.')
        expect(response).to have_http_status(200) # 200 OK
      end
    end

    context "when the image fails to add" do
      it "returns an error message and a 422 status code" do
        post :add_image, params: { id: tour.id, image: nil }
        expect(response.body).to include('Failed to add image')
        expect(response).to have_http_status(422) # 422 Unprocessable Entity
      end
    end
  end
end
