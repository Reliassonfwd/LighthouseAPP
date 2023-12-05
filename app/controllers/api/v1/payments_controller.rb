# Api::V1::PaymentController
#
# Este controlador maneja las solicitudes a la API relacionadas con los pagos.

class Api::V1::PaymentsController < ApplicationController
  # Antes de ejecutar ciertos métodos, se ejecuta el método set_payment.
  before_action :set_payment, only: [:show, :edit, :update, :destroy]

  # index: Recopila todos los pagos y los envía en la respuesta JSON.
  def index
    @payments = Payment.all
    render json: @payments
  end

  # show: Envía el pago especificado en la respuesta JSON.
  def show
    render json: @payment
  end

  # new: Crea una nueva instancia de pago.
  def new
    @payment = Payment.new
  end

  # edit: Método vacío, incluido por completitud.
  def edit; end

  # create: Crea un nuevo pago. Si la creación es exitosa, redirige al usuario al pago.
  # Si no, vuelve a renderizar la vista de new.
  def create
    @payment = Payment.new(payment_params)
    if @payment.save
      redirect_to api_v1_payment_path(@payment), notice: 'Payment created successfully'
    else
      render :new
    end
  end

  # update: Actualiza un método de pago existente. Si la actualización es exitosa, redirige al usuario al método de pago.
  # Si no, vuelve a renderizar la vista de edit.
  def update
    if @payment.update(payment_params)
      redirect_to @payment, notice: 'Payment was successfully updated.'
    else
      render :edit
    end
  end

  # destroy: Elimina un método de pago existente y redirige al usuario a la lista de métodos de pago.
  def destroy
    @payment.destroy
    redirect_to payments_url, notice: 'Payment was successfully destroyed.'
  end

  private

  # set_payment: Encuentra el pago especificado por params[:id] y lo asigna a @payment.
  def set_payment
    @payment = Payment.find(params[:id])
  end

  # payment_params: Este método se encarga de manejar la seguridad de los parámetros del pago.
  # Requiere que los parámetros incluyan un :payment y permite :payment_type.
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