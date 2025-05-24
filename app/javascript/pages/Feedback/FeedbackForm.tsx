import { Head, router, useForm } from '@inertiajs/react'
import React, { FormEvent } from 'react'

export default function FeedbackForm() {
  const { data, setData, post, reset, errors } = useForm({
    name: '',
    email: '',
    message: '',
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    post('/inertia/feedbacks', {
      onSuccess: () => reset(),
      preserveState: false,
    })
  }

  return (
    <>
        <form onSubmit={submit} className="glass-card space-y-6 p-8 rounded-xl max-w mr-10">
          <div>
            <label htmlFor="name" className="font-medium text-gray/100">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              className="mt-1 block w-full rounded-md bg-neutral-800/30 border border-gray-700 text-gray-100 focus:ring-white/30 focus:border-white/5"
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">
              Email <span className="text-red-500">*</span>
              <button
                type="button"
                title="We only use your email to follow up."
                className="ml-2 text-gray-400 hover:text-gray-200 transition"
              >
                ℹ️
              </button>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              className="mt-1 block w-full rounded-md bg-neutral-800/30 border border-gray-700 text-gray-100 focus:ring-white/30 focus:border-white/5"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block font-medium">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={data.message}
              onChange={e => setData('message', e.target.value)}
              className="mt-1 block w-full rounded-md bg-neutral-800/30 border border-gray-700 text-gray-100 focus:ring-white/30 focus:border-white/5"
            />
            {errors.message && (
              <p className="text-red-600 text-sm">{errors.message[0]}</p>
            )}
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-neutral-900 hover:bg-neutral-700 text-white font-semibold rounded-md shadow transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              disabled={Object.keys(errors).length > 0}
            >
              Submit
            </button>
          </div>
        </form>
    </>
  )
}
