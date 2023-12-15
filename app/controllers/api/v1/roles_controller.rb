# Api::V1::RolesController
#
# This controller handles API requests related to roles.

class Api::V1::RolesController < ApplicationController
  before_action :set_role, only: [:show, :update, :destroy]

  # GET /roles
  # Public: Retrieves all roles.
  def index
    @roles = Role.all
    render json: @roles
  end

  # GET /roles/1
  # Public: Retrieves a specific role by ID.
  def show
    render json: @role
  end

  # POST /roles
  # Public: Creates a new role.
  def create
    @role = Role.new(role_params)

    if @role.save
      render json: @role, status: :created, location: @role
    else
      render json: @role.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /roles/1
  # Public: Updates an existing role.
  def update
    if @role.update(role_params)
      render json: @role
    else
      render json: @role.errors, status: :unprocessable_entity
    end
  end

  # DELETE /roles/1
  # Public: Deletes a role by ID.
  def destroy
    @role.destroy
    render json: { message: 'Role was successfully deleted.' }
  end

  private
    # set_role: Finds the role specified by params[:id] and assigns it to @role.
    def set_role
      @role = Role.find(params[:id])
    end

    # role_params: Handles the security of the role parameters.
    # Allows only the :name parameter.
    def role_params
      params.require(:role).permit(:name)
    end
end
