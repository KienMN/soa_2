module Student::Comment::CreateHelper
  def process
    create_comment

    generate_status
  end

  def create_comment
    @evaluation_form = EvaluationForm.eager_load(:student)
      .find_by(id: @params[:evaluation_id])

    if @evaluation_form.user_id == @current_user.id
      @new_comment = ::Comment.create(comment_params)
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
    @params.permit(:content, :user_id, :evaluation_id)
  end
end
