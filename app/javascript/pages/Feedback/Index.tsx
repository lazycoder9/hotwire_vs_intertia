import { Head } from '@inertiajs/react'
import React from 'react'
import FeedbackForm from './FeedbackForm'

type Feedback = {
  id: number
  name: string
  email: string
  message: string
  created_at: string
}

type Props = {
  feedbacks: Feedback[]
}

export default function Index({ feedbacks }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      time: date.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }),
    }
  }

  return (
    <>
      <Head title="Inertia Feedbacks" />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">
          Inertia Feedbacks
        </h1>
        <p className="text-white/70 text-sm">Share your thoughts with seamless interactions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-10rem)]">
        {/* Form Section */}
        <div className="space-y-4">
          <FeedbackForm />
        </div>
        
        {/* Feedbacks Section */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center">
              Recent Feedback
              <span className="ml-2 px-2 py-1 text-xs bg-white/10 rounded-full border border-white/20">
                {feedbacks.length}
              </span>
            </h2>
            
            <div id="feedbacks" className="space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2">
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback: Feedback) => {
                  const { date, time } = formatDate(feedback.created_at)
                  
                  return (
                    <div key={feedback.id} className="glass-feedback-item">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                            <span className="text-white font-semibold text-xs">
                              {feedback.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-white">{feedback.name}</h3>
                            <p className="text-white/70 text-xs">{feedback.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <time
                            className="text-white/60 text-xs whitespace-nowrap block"
                            dateTime={feedback.created_at}
                          >
                            {date}
                          </time>
                          <time
                            className="text-white/50 text-xs whitespace-nowrap block mt-0.5"
                            dateTime={feedback.created_at}
                          >
                            {time}
                          </time>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                          {feedback.message}
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <span className="text-lg text-white/60">◯</span>
                  </div>
                  <p className="text-white/60 text-base">No feedback yet</p>
                  <p className="text-white/40 text-xs">Be the first to share your thoughts</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

