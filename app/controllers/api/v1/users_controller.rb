# Api::V1::UsersController
#
# This controller handles API requests related to users.

class Api::V1::UsersController < ApplicationController
  # Before executing certain methods, the set_user and authenticate_user methods are run.
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # index: Collects all users and sends them in the JSON response.
  def index
    @users = User.all
    render json: @users
  end

  # show: Sends the specified user in the JSON response.
  def show
    render json: @user
  end

  # create: Creates a new user. If the creation is successful, it sends the user in the JSON response.
  # If not, it sends the validation errors in the JSON response.
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # edit: Sends the specified user in the JSON response.
  def edit
    render json: @user   
  end

  # update: Updates an existing user. If the update is successful, it sends the user in the JSON response.
  # If not, it sends the validation errors in the JSON response.
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # destroy: Deletes an existing user and sends an HTTP response without content.
  def destroy
    @user.destroy
    head :no_content
  end

  private

  # set_user: Finds the user specified by params[:id] and assigns it to @user.
  # If the user is not found, it sends an error in the JSON response.
  def set_user
    @user = User.find_by(id: params[:id])
    unless @user
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  # user_params: This method handles the security of the user parameters.
  # It requires the parameters to include a :user and allows :name, :email, :password.
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
