import { Head, router, useForm } from '@inertiajs/react'
import React, { FormEvent } from 'react'

export default function New() {
  const { data, setData, post, reset, errors } = useForm({
    name: '',
    email: '',
    message: '',
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    post('/inertia/feedbacks', {
      onSuccess: () => reset(),   // <-- this clears data back to your initial state
      preserveState: false,       // optional, here to be explicit
    })
  }

  return (
    <>
      <Head title="Quick Feedback" />
      <div className="max-w-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">
          Tell us what you think
        </h1>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              className="mt-1 block w-full rounded border-gray-300"
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
                className="ml-2 text-gray-400 hover:text-gray-600"
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
              className="mt-1 block w-full rounded border-gray-300"
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
              className="mt-1 block w-full rounded border-gray-300"
            />
            {errors.message && (
              <p className="text-red-600 text-sm">{errors.message[0]}</p>
            )}
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded
                         disabled:opacity-50"
              disabled={Object.keys(errors).length > 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
