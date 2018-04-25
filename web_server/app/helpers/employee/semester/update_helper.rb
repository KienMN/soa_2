module Employee::Semester::UpdateHelper
  def process
    update_semester

    generate_status
  end

  private

  def update_semester
    @semester = ::Semester.find_by(@params[:id])

    @semester.update_attributes(semester_params)

    if @semester.status.closed?
      @semester.evaluation_forms.update_all(status: ::EvaluationForm.statuses[:closed])
    end
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "Thành công",
      :data    => @semester
    }
  end

  def semester_params
    @params.permit(:title, :status)
  end
end
