class Student < User
  has_many :evaluation_forms
  has_many :organization_users
  has_many :organizations, through: :organization_users
end
