module Employee::Semester::CreateHelper
  def process
    create_semester

    generate_status
  end

  private

  def create_semester
    @new_semester = ::Semester.create(semester_params)
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
