# TourPolicy
#
# Esta política de Pundit define las autorizaciones para las acciones de creación, actualización y destrucción en el modelo Tour.
# Solo los usuarios con el rol de administrador pueden realizar estas acciones.

class TourPolicy < ApplicationPolicy
  # Solo los usuarios con el rol de administrador pueden crear tours.
  def create?
    user.admin?
  end

  # Solo los usuarios con el rol de administrador pueden actualizar tours.
  def update?
    user.admin?
  end

  # Solo los usuarios con el rol de administrador pueden destruir tours.
  def destroy?
    user.admin?
  end
end