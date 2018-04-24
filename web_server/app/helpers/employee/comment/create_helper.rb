module Employee::Comment::CreateHelper
  def process
    create_comment

    generate_status
  end

  def create_comment
    @new_comment = ::Comment.create(comment_params.merge(
      user_id: @current_user.id
    ))
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
