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
  return (
    <>
      <Head title="Feedbacks" />
      <h1 className="text-3xl font-bold text-white mb-6">Feedbacks</h1>

      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex-1 p-2">
          <FeedbackForm />
        </div>
        <div className="flex-1 p-2">
          <div id="feedbacks" className="space-y-4">
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback: Feedback) => (
                <div
                  key={feedback.id}
                  className="glass-card p-4 hover:border-white/25 transition"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex">
                      <h2 className="text-md font-semibold text-white">
                        {feedback.name}
                      </h2>
                      <span className="text-gray-400 text-sm ml-4">
                        <i>{feedback.email}</i>
                      </span>
                    </div>
                    <time
                      className="text-gray-500 text-xs whitespace-nowrap"
                      dateTime={feedback.created_at}
                    >
                      {new Date(feedback.created_at).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    </time>
                  </div>
                  <p className="mt-3 text-gray-200 whitespace-pre-wrap">
                    {feedback.message}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">
                No feedback yet. Be the first to leave one!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

