# Role
#
# This model represents a role in the application.
# Each role can be associated with many users and an optional polymorphic resource.
# The polymorphic resource allows a role to be associated with any other model in the application.

class Role < ApplicationRecord
  # A role has and belongs to many users. The relationship is managed through the join table users_roles.
  # This means that each role can be associated with multiple users.
  has_and_belongs_to_many :users, :join_table => :users_roles
  
  # A role belongs to a resource, which can be of any type. This association is optional.
  # This means that each role can be associated with one resource of any type.
  belongs_to :resource,
             :polymorphic => true,
             :optional => true
  
  # It validates that the resource type is included in the list of resource types defined by Rolify.
  # If the resource type is null, the validation is not performed.
  validates :resource_type,
            :inclusion => { :in => Rolify.resource_types, message: "is not included in the list" },
            :allow_nil => true

  # scopify is a method provided by Rolify that generates dynamic scopes for roles.
  scopify
end
