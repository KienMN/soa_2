module Employee::Semester::DestroyHelper
  def process
    destroy_semester

    generate_status
  end

  private

  def destroy_semester
    ::Semester.find_by(id: @params[:id]).destroy
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công"
    }
  end
end
