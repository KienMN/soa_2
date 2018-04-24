module Employees::Comment::DestroyHelper
  def process
    destroy_comment

    generate_status
  end

  def destroy_comment
    @comment = ::Comment.find_by(id: @params[:id])
    if @comment.user_id == @current_user.id
      @comment.destroy
    end
  end

  def generate_status
    @status = {
      :code    => Settings.code.success,
      :message => "",
    }
  end
end
