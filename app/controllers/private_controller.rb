# app/controllers/private_controller.rb

class PrivateController < ApplicationController
  def test
    render plain: 'This is a private test page'
  end
end
