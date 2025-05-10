module Inertia
  class FeedbacksController < ApplicationController
    def new
      render inertia: "Feedback/New", props: { feedback: {} }
    end

    def create
      feedback = Feedback.new(feedback_params)

      if feedback.save
        redirect_to new_inertia_feedbacks_path, notice: "Thanks for your feedback!"
      else
        render inertia: "Feedback/New", props: {
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
