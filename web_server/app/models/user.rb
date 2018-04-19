class User < ApplicationRecord
  has_many :comments, dependent: :destroy
  belongs_to :organization
end
