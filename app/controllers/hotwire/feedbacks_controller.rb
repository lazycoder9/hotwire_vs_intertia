module Hotwire
  class FeedbacksController < ApplicationController
    before_action :build_new_feedback, only: %i[index]

    def index
      @feedbacks = Feedback.order(created_at: :desc)
    end

    def create
      @feedback = Feedback.new(feedback_params)

      respond_to do |format|
        if @feedback.save
          format.html do
            redirect_to hotwire_feedbacks_path,
                        notice: "Thanks for your feedback!"
          end
          format.turbo_stream  # will render create.turbo_stream.erb
        else
          format.html do
            @feedbacks = Feedback.order(created_at: :desc)
            render :index, status: :unprocessable_entity
          end
          format.turbo_stream do
            # re-render just the form frame with errors
            render turbo_stream:
              turbo_stream.replace(
                "feedback_form",
                partial: "hotwire/feedbacks/form",
                locals: { feedback: @feedback }
              )
          end
        end
      end
    end

    private

    def build_new_feedback
      @feedback = Feedback.new
    end

    def feedback_params
      params.require(:feedback).permit(:name, :email, :message)
    end
  end
end
