module Employee::Semester::CreateHelper
  def process
    create_semester

    generate_status
  end

  private

  def create_semester
    @new_semester = ::Semester.create(semester_params)

    ::EvaluationForm.bulk_insert do |worker|
      ::Student.all.each do |student|
        worker.add(
          target_assignment: ::EvaluationForm.generate_form,
          semester_id: @new_semester.id,
          student_id: student.id
        )
      end
    end
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => @new_semester
    }
  end

  def semester_params
    @params.permit(:title, :status)
  end
end
