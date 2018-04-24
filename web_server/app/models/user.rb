class User < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :organization_users
  has_many :organizations, through: :organization_users

  def self.get_user_with_group(conditions)
    return User.find_by conditions
  end
end
