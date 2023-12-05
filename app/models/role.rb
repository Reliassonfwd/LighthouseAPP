# Role
#
# Este modelo representa un rol en la aplicación. 
# Cada rol puede estar asociado a muchos usuarios y a un recurso polimórfico opcional.
# El recurso polimórfico permite que un rol esté asociado a cualquier otro modelo en la aplicación.

class Role < ApplicationRecord
  # Un rol tiene y pertenece a muchos usuarios. La relación se maneja a través de la tabla de unión users_roles.
  has_and_belongs_to_many :users, :join_table => :users_roles
  
  # Un rol pertenece a un recurso, que puede ser de cualquier tipo. Esta asociación es opcional.
  belongs_to :resource,
             :polymorphic => true,
             :optional => true
  
  # Se valida que el tipo de recurso esté incluido en la lista de tipos de recursos definidos por Rolify.
  # Si el tipo de recurso es nulo, no se realiza la validación.
  validates :resource_type,
            :inclusion => { :in => Rolify.resource_types, message: "is not included in the list" },
            :allow_nil => true

  # scopify es un método proporcionado por Rolify que genera scopes dinámicos para los roles.
  scopify
end