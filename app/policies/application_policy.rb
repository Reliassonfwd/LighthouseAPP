# # frozen_string_literal: true

# ApplicationPolicy
#
# Base class for defining authorization policies in the application.
# It provides a set of default methods for common CRUD actions and a nested `Scope` class for scoping queries.

class ApplicationPolicy
  # Attributes:
  # - user: Represents the user for whom the policy is applied.
  # - record: Represents the resource or record to which the policy is applied.
  attr_reader :user, :record

  # Constructor:
  # - Initializes the policy with a user and a record.
  def initialize(user, record)
    @user = user
    @record = record
  end

  # Default Action Methods:
  # - The following methods return false by default and can be overridden in subclasses.

  def index?
    false
  end

  def show?
    false
  end

  def create?
    false
  end

  def new?
    create?
  end

  def update?
    false
  end

  def edit?
    update?
  end

  def destroy?
    false
  end

  # Scope Class:
  # - A nested class for defining query scopes based on the user's permissions.

  class Scope
    # Constructor:
    # - Initializes the scope with a user and a target scope.
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    # Resolve Method:
    # - A placeholder method that must be defined in subclasses.
    # - It is responsible for scoping the query based on the user's permissions.
    def resolve
      raise NotImplementedError, "You must define #resolve in #{self.class}"
    end

    private

    attr_reader :user, :scope
  end
end
