class Semester < ApplicationRecord
  has_many :evaluation_forms, dependent: :destroy

  enum status: [:avaiable, :closed]

  def create_evaluation_form
    EvaluationForm.bulk_insert do |worker|
      Student.all.each do |student|
        worker.add(EvaluationForm.generate_form.merge({
          student_id: student.id,
          semester_id: self.id,
        }))
      end
    end
  end
end
