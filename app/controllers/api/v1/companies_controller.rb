# Api::V1::CompaniesController
#
# This controller handles API requests related to companies.

class Api::V1::CompaniesController < ApplicationController
  # Before executing certain methods, the set_company method is executed.
  before_action :set_company, only: [:show, :edit, :update, :destroy]

  # index: Gathers all companies and sends them in the JSON response.
  def index
    @companies = Company.all
    render json: @companies
  end

  # show: Sends the specified company in the JSON response.
  def show
    render json: @company
  end

  # new: Creates a new instance of a company.
  def new
    @company = Company.new
  end

  # edit: Empty method, included for completeness.
  def edit
    render json: @company
  end

  # create: Creates a new company. If the creation is successful, it redirects the user to the company.
  # If not, it re-renders the new view.
  def create
    @company = Company.new(company_params)
    if @company.save
      redirect_to @company, notice: 'Company was successfully created.'
    else
      render :new
    end
  end

  # update: Updates an existing company. If the update is successful, it redirects the user to the company.
  # If not, it re-renders the edit view.
  def update
    if @company.update(company_params)
      redirect_to @company, notice: 'Company was successfully updated.'
    else
      render :edit
    end
  end

  # destroy: Deletes an existing company and redirects the user to the list of companies.
  def destroy
    @company.destroy
    redirect_to companies_url, notice: 'Company was successfully destroyed.'
  end

  private

  # set_company: Finds the company specified by params[:id] and assigns it to @company.
  def set_company
    @company = Company.find(params[:id])
  end

  # company_params: This method handles the security of the company parameters.
  # It requires the parameters to include a :company and allows :name, :description, :address, :contact_info.
  def company_params
    params.require(:company).permit(:name, :description, :address, :contact_info)
  end
end
