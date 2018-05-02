module Employee::Semester::UpdateHelper
  def process
    update_semester

    generate_status
  end

  private

  def update_semester
    @semester = ::Semester.find_by(id: @params[:id])

    @semester.update_attributes(semester_params)

    if @semester.closed?
      @semester.evaluation_forms.where(status: ::EvaluationForm.statuses[:complete])
      	.update_all(status: ::EvaluationForm.statuses[:closed])

      @semester.evaluation_forms.where(status: ::EvaluationForm.statuses[:avaiable])
      	.update_all(status: ::EvaluationForm.statuses[:out_of_date])
    elsif @semester.avaiable?
    	@semester.evaluation_forms.where(status: ::EvaluationForm.statuses[:closed])
      	.update_all(status: ::EvaluationForm.statuses[:complete])

      @semester.evaluation_forms.where(status: ::EvaluationForm.statuses[:out_of_date])
      	.update_all(status: ::EvaluationForm.statuses[:avaiable])
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
