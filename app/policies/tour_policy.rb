class TourPolicy < ApplicationPolicy
  # Only users with the administrator role can create tours.
  # This method checks if the user has the role of an administrator before allowing them to create a tour.
  def create?
    user.admin?
  end

  # Only users with the administrator role can update tours.
  # This method checks if the user has the role of an administrator before allowing them to update a tour.
  def update?
    user.admin?
  end

  # Only users with the administrator role can destroy tours.
  # This method checks if the user has the role of an administrator before allowing them to destroy a tour.
  def destroy?
    user.admin?
  end
end
