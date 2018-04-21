module Employee::Semester::ShowHelper
  def process
    get_semester

    generate_status
  end

  private

  def get_semester
    @semester = ::Semester.find_by(id: @params[:id])
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công",
      :data    => @semester
    }
  end
end
