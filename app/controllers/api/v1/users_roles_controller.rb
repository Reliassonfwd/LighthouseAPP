class Api::V1::UsersRolesController < ApplicationController
  before_action :set_user_role, only: [:show, :update, :destroy]

  # GET /users_roles
  def index
    @users_roles = UserRole.all

    render json: @users_roles
  end

  # GET /users_roles/1
  def show
    render json: @user_role
  end

  # POST /users_roles
  def create
    @user_role = UserRole.new(user_role_params)

    if @user_role.save
      render json: @user_role, status: :created, location: @user_role
    else
      render json: @user_role.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users_roles/1
  def update
    if @user_role.update(user_role_params)
      render json: @user_role
    else
      render json: @user_role.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users_roles/1
  def destroy
    @user_role.destroy
    render json: { message: 'UserRole was successfully deleted.' }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_role
      @user_role = UserRole.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_role_params
      params.require(:user_role).permit(:user_id, :role_id)
    end
end