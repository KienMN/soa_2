class Semester < ApplicationRecord
  enum status: [:avaiable, :out_of_date]
end
