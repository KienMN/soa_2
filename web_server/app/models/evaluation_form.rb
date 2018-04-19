class EvaluationForm < ApplicationRecord
  has_many :comments
  belongs_to :student, class_name: "Student", foreign_key: "user_id"

  enum status: [:avaiable, :complete, :closed, :out_of_date]

  COMFIRMATION = {
    class_president: 2,
    adviser: 3,
    employee: 5
  }
end
