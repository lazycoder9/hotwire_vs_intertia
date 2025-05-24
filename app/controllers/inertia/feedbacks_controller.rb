module Inertia
  class FeedbacksController < ApplicationController
    def index
      @feedbacks = Feedback.order(created_at: :desc)

      render inertia: "Feedback/Index", props: { feedbacks: @feedbacks }
    end

    def create
      feedback = Feedback.new(feedback_params)

      if feedback.save
        redirect_to inertia_feedbacks_path, notice: "Thanks for your feedback!"
      else
        render inertia: "Feedback/Index", props: {
          feedback: feedback.attributes,
          errors: feedback.errors
        }
      end
    end

    private

    def feedback_params
      params.require(:feedback).permit(:name, :email, :message)
    end
  end
end
