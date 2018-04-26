module Employee::EvaluationForm::ShowHelper
  def process
    get_evaluation_form

    generate_status
  end

  private

  def get_evaluation_form
    @evaluation_form = ::EvaluationForm.eager_load(comments: [:user], :semester)
      .find_by(id: @params[:id])

    @comments = []
    @evaluation_form.comments.each do |c|
      tmp = c.attributes
      tmp.merge("username" => c.user.username)
      @comments << tmp
    end
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => {
        :evaluation_form => @evaluation_form,
        :comments        => @comments,
        :semester        => @evaluation_form.semester
      }
    }
  end
end
