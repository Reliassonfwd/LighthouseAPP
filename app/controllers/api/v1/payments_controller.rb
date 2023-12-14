# Api::V1::PaymentController
#
# This controller handles API requests related to payments.

class Api::V1::PaymentsController < ApplicationController
  # Before executing certain methods, the set_payment method is run.
  before_action :set_payment, only: [:show, :edit, :update, :destroy]

  # index: Collects all payments and sends them in the JSON response.
  def index
    @payments = Payment.all
    render json: @payments
  end

  # show: Sends the specified payment in the JSON response.
  def show
    render json: @payment
  end

  # new: Creates a new payment instance.
  def new
    @payment = Payment.new
  end

  # edit: Empty method, included for completeness.
  def edit
    render json: @payment
  end

  # create: Creates a new payment. If the creation is successful, it redirects the user to the payment.
  # Otherwise, it re-renders the new view.
  def create
    @payment = Payment.new(payment_params)
    if @payment.save
      redirect_to api_v1_payment_path(@payment), notice: 'Payment created successfully'
    else
      render :new
    end
  end

  # update: Updates an existing payment method. If the update is successful, it redirects the user to the payment method.
  # Otherwise, it re-renders the edit view.
  def update
    if @payment.update(payment_params)
      redirect_to @payment, notice: 'Payment was successfully updated.'
    else
      render :edit
    end
  end

  # destroy: Deletes an existing payment method and redirects the user to the list of payment methods.
  def destroy
    @payment.destroy
    redirect_to payments_url, notice: 'Payment was successfully destroyed.'
  end

  private

  # set_payment: Finds the payment specified by params[:id] and assigns it to @payment.
  def set_payment
    @payment = Payment.find(params[:id])
  end

  # payment_params: This method handles the security of the payment parameters.
  # It requires the parameters to include a :payment and allows :payment_type.
  def payment_params
    params.require(:payment).permit(:payment_type, :card_name, :card_number, :cvv, :expiration_date, :user_id)
  end

  def encode_sensitive_data
    self.card_number = Base64.strict_encode64(card_number.to_s)
    self.cvv = Base64.strict_encode64(cvv.to_s)
  end

  def decode_sensitive_data
    self.card_number = Base64.strict_decode64(card_number.to_s)
    self.cvv = Base64.strict_decode64(cvv.to_s)
  end

end
