# Api::V1::UsersRolesController
#
# This controller handles API requests related to user roles.

class Api::V1::UsersRolesController < ApplicationController
  before_action :set_user_role, only: [:show, :update, :destroy]

  # GET /users_roles
  # Public: Retrieves all user roles.
  def index
    @users_roles = UserRole.all
    render json: @users_roles
  end

  # GET /users_roles/1
  # Public: Retrieves a specific user role by ID.
  def show
    render json: @user_role
  end

  # POST /users_roles
  # Public: Creates a new user role.
  def create
    @user_role = UserRole.new(user_role_params)

    if @user_role.save
      render json: @user_role, status: :created, location: @user_role
    else
      render json: @user_role.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users_roles/1
  # Public: Updates an existing user role.
  def update
    if @user_role.update(user_role_params)
      render json: @user_role
    else
      render json: @user_role.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users_roles/1
  # Public: Deletes a user role by ID.
  def destroy
    @user_role.destroy
    render json: { message: 'UserRole was successfully deleted.' }
  end

  private
    # set_user_role: Finds the user role specified by params[:id] and assigns it to @user_role.
    def set_user_role
      @user_role = UserRole.find(params[:id])
    end

    # user_role_params: Handles the security of the user role parameters.
    # Allows only the :user_id and :role_id parameters.
    def user_role_params
      params.require(:user_role).permit(:user_id, :role_id)
    end
end
