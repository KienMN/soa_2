class Organization < ApplicationRecord
  has_many :organization_users
  has_many :users, though: :organization_users
  enum type: [:class, :employee_office]
end
