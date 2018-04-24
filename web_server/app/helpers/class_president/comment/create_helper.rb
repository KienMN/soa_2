module ClassPresident::Comment::CreateHelper
  def process
    create_comment

    generate_status
  end

  def create_comment
    @evaluation_form = ::EvaluationForm.eager_load(student: [:organization])
      .find_by(id: @params[:evaluation_form_id], status: ::EvaluationForm.statuses[:avaiable])

    organization_user = ::OrganizationUser.find_by(
      id: @evaluation_form.student.organization.id,
      user_id: @current_user.id
    )

    if organization_user.present?
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
