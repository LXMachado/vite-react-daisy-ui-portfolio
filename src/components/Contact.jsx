import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "../utils/motion"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState(null)
  const [csrfToken, setCsrfToken] = useState('')
  const [errors, setErrors] = useState({})
  const [fieldErrors, setFieldErrors] = useState([])

  // Fetch CSRF token on component mount
  useEffect(() => {
    fetchCSRFToken()
  }, [])

  const fetchCSRFToken = async () => {
    try {
      const response = await fetch('/process_form.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setCsrfToken(data.csrf_token)
      }
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error)
    }
  }

  const getFieldError = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required'
        }
        if (value.length > 100) {
          return 'Name must be less than 100 characters'
        }
        return null
      case 'email':
        if (!value.trim()) {
          return 'Email is required'
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address'
        }
        if (value.length > 254) {
          return 'Email address is too long'
        }
        return null
      case 'message':
        if (!value.trim()) {
          return 'Message is required'
        }
        if (value.length > 5000) {
          return 'Message must be less than 5000 characters'
        }
        return null
      default:
        return null
    }
  }

  const validateField = (name, value, currentErrors = {}) => {
    const newErrors = { ...currentErrors }
    const errorMessage = getFieldError(name, value)

    if (errorMessage) {
      newErrors[name] = errorMessage
    } else {
      delete newErrors[name]
    }

    return newErrors
  }

  const validateAllFields = (values) => {
    let accumulatedErrors = {}

    accumulatedErrors = validateField('name', values.name, accumulatedErrors)
    accumulatedErrors = validateField('email', values.email, accumulatedErrors)
    accumulatedErrors = validateField('message', values.message, accumulatedErrors)

    return accumulatedErrors
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })

    // Clear or update field-specific errors when the user edits a field
    setErrors((prevErrors) => validateField(id, value, prevErrors))
    
    // Clear general field errors
    setFieldErrors([])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitStatus('submitting')
    setFieldErrors([])
    
    // Validate all fields before submission
    const validationErrors = validateAllFields(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus('validation-error')
      return
    }

    // Prepare form data with CSRF token
    const formDataWithToken = new URLSearchParams({
      ...formData,
      csrf_token: csrfToken
    })

    try {
      const response = await fetch('/process_form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataWithToken.toString()
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
        // Refresh CSRF token for next submission
        fetchCSRFToken()
      } else if (result.errors) {
        // Handle validation errors from backend
        setFieldErrors(result.errors)
        setSubmitStatus('server-validation-error')
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('network-error')
    }
  }

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      id="contact"
      className="section-shell"
    >
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="section-header"
      >
        <h1 className="section-title">Get in touch</h1>
        <span className="section-subtitle">
          Contact me now and scale your business
        </span>
      </motion.div>
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-12 lg:flex-row"
      >
        <div className="flex w-full flex-1 flex-col gap-10">
          <div className="space-y-6">
            <p className="contact-detail">
              <span className="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <span className="contact-text">Miami, Queensland, Australia</span>
            </p>

            <p className="contact-detail">
              <span className="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </span>
              <span className="contact-text">+61 424 550 140</span>
            </p>

            <p className="contact-detail">
              <span className="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span className="contact-text">info@alexandremachado.com.au</span>
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-ink-muted">Follow me</h3>
            <div className="flex gap-3">
              <a
                className="social-link"
                href="https://x.com/ASMWebDev"
                aria-label="twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.6668 6.67334C18.0002 7.00001 17.3468 7.13268 16.6668 7.33334C15.9195 6.49001 14.8115 6.44334 13.7468 6.84201C12.6822 7.24068 11.9848 8.21534 12.0002 9.33334V10C9.83683 10.0553 7.91016 9.07001 6.66683 7.33334C6.66683 7.33334 3.87883 12.2887 9.3335 14.6667C8.0855 15.498 6.84083 16.0587 5.3335 16C7.53883 17.202 9.94216 17.6153 12.0228 17.0113C14.4095 16.318 16.3708 14.5293 17.1235 11.85C17.348 11.0351 17.4595 10.1932 17.4548 9.34801C17.4535 9.18201 18.4615 7.50001 18.6668 6.67268V6.67334Z" />
                </svg>
              </a>

              <a
                className="social-link"
                href="https://www.linkedin.com/in/alexandre-machado-664884249/"
                aria-label="linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z"
                  />
                  <path d="M7.2 9.6001H4V19.2001H7.2V9.6001Z" />
                  <path d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z" />
                </svg>
              </a>

              <a
                className="social-link"
                href="https://github.com/LXMachado"
                aria-label="github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.157 21.128 9.615 22.578C10.115 22.668 10.3 22.344 10.3 22.063C10.3 21.809 10.291 21.065 10.286 20.175C7.269 20.821 6.639 18.725 6.639 18.725C6.14 17.476 5.42 17.153 5.42 17.153C4.421 16.495 5.49 16.507 5.49 16.507C6.595 16.578 7.178 17.595 7.178 17.595C8.153 19.208 9.883 18.772 10.318 18.503C10.407 17.819 10.668 17.384 10.956 17.131C8.533 16.875 5.985 15.961 5.985 11.744C5.985 10.566 6.417 9.603 7.199 8.849C7.098 8.581 6.713 7.462 7.298 5.85C7.298 5.85 8.219 5.567 10.275 6.924C11.147 6.691 12.084 6.575 13.015 6.571C13.945 6.575 14.881 6.691 15.755 6.924C17.809 5.567 18.728 5.85 18.728 5.85C19.315 7.462 18.93 8.581 18.829 8.849C19.613 9.603 20.041 10.566 20.041 11.744C20.041 15.973 17.489 16.872 15.058 17.122C15.423 17.437 15.75 18.059 15.75 19.004C15.75 20.349 15.738 21.715 15.738 22.063C15.738 22.347 15.92 22.674 16.43 22.577C20.885 21.124 24.038 16.99 24.038 12C24.038 6.477 19.561 2 14.038 2H12Z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="surface flex-1">
          <div className="mx-auto w-full max-w-xl">
            <h2 className="text-2xl font-heading font-semibold text-slate-900 dark:text-ink">What do you want to ask?</h2>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-ink-muted/90">
              Share a few details about your project or challenge and I’ll respond within 24 hours.
            </p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Display server validation errors */}
              {fieldErrors.length > 0 && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <h4 className="text-sm font-medium text-red-800 mb-2">Please fix the following errors:</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {fieldErrors.map((error, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex-1">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  type="text"
                  placeholder="Your Name"
                  className={`form-input ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
                  value={formData.name}
                  onChange={handleChange}
                  disabled={submitStatus === 'submitting'}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="flex-1">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  id="email"
                  autoComplete="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`form-input ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={submitStatus === 'submitting'}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="w-full">
                <label htmlFor="message" className="form-label">
                  Message
                  <span className="text-xs text-slate-500 ml-2 dark:text-ink-muted">
                    ({formData.message.length}/5000)
                  </span>
                </label>
                <textarea
                  id="message"
                  autoComplete="message"
                  className={`form-textarea ${errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={submitStatus === 'submitting'}
                  rows="5"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <button
                className="button-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={submitStatus === 'submitting' || Object.keys(errors).length > 0}
                type="submit"
              >
                {submitStatus === 'submitting' ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Get in touch'}
              </button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="text-sm font-medium text-green-800">
                      Message sent successfully! I'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Messages */}
              {submitStatus === 'error' && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-sm font-medium text-red-800">
                      Failed to send message. Please try again or contact me directly.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'network-error' && (
                <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <p className="text-sm font-medium text-yellow-800">
                      Network error. Please check your connection and try again.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'validation-error' && (
                <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-sm font-medium text-yellow-800">
                      Please fix the errors above before submitting.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </motion.div>
      <div className="flex items-center justify-center pt-12 text-sm text-slate-500 lg:text-base dark:text-ink-muted">
        <h1>© 2024 Alexandre Machado. All rights reserved.</h1>
      </div>
    </motion.section>
  )
}

export default Contact
