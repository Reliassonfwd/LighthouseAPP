# require 'rails_helper'

# RSpec.describe Role, type: :model do
#   let(:role) { Role.new }

#   it 'is valid with valid attributes' do
#     role.resource_type = 'ValidResource' # Cambia esto a un valor válido
#     expect(role).to be_valid
#   end

#   it 'is not valid without a resource_type' do
#     role.resource_type = nil
#     role.valid?
#     expect(role.errors[:resource_type]).to include("can't be blank") # Cambia esto para verificar el mensaje de error correcto
#   end

#   it 'is not valid with a resource_type not included in Rolify.resource_types' do
#     role.resource_type = 'InvalidResource'
#     role.valid?
#     expect(role.errors[:resource_type]).to include("is not included in the list") # Cambia esto para verificar el mensaje de error correcto
#   end
# end