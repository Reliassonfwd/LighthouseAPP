# # Api::V1::ApiController
#
# This controller handles API requests to the root of the API.

class Api::V1::ApiController < ApplicationController

  # Index action
  #
  # This method handles GET requests to the root of the API.
  # It gathers all records from various database tables and sends them in the JSON response.
  # The tables include: bookings, comments, companies, payments, tours, and users.
  
  def index
    render json: {
      bookings: Booking.all,
      comments: Comment.all,
      companies: Company.all,
      payments: Payment.all,
      tours: Tour.all,
      users: User.all
    }
  end
end
