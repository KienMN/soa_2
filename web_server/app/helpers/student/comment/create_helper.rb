module Student::Comment::CreateHelper
  def process
    create_comment

    generate_status
  end

  def create_comment
    @evaluation_form = ::EvaluationForm.find_by(id: @params[:evaluation_form_id])

    if @evaluation_form.student_id == @current_user.id
      @new_comment = ::Comment.create(comment_params.merge(
        user_id: @current_user.id
      ))
    end
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
      :data    => @new_comment,
    }
  end

  private
  def comment_params
    @params.permit(:content, :evaluation_form_id)
  end
end
