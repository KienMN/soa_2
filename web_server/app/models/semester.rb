class Semester < ApplicationRecord
  has_many :evaluation_forms

  enum status: [:avaiable, :out_of_date]
end
