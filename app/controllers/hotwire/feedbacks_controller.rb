module Hotwire
  class FeedbacksController < ApplicationController
    def new
      @feedback = Feedback.new
    end

    def create
      @feedback = Feedback.new(feedback_params)
      if @feedback.save
        redirect_to hotwire_feedback_path,
                    notice: "Thanks for your feedback!"
      else
        render :new, status: :unprocessable_entity
      end
    end

    private
    def feedback_params
      params.require(:feedback).permit(:name, :email, :message)
    end
  end
end
