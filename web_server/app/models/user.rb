class User < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :organization

  def self.get_user_with_group(conditions)
    return User.select('users.*', "organizations.id as organization_id")
      .joins(:groups).find_by conditions
  end
end
