import React, { useState } from "react"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "../utils/motion"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    const formBody = new URLSearchParams(formData).toString();

    try {
      const response = await fetch('/process_form.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
      });

      if (response.ok) {
        const result = await response.text();
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      id="contact"
      className="mt-20">
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="flex w-full flex-col justify-center">
        <h1 className="text-center font-urbanist text-2xl font-semibold md:text-5xl">
          Get in touch
        </h1>
        <span className="text-md mt-2 px-2 text-center font-urbanist md:mt-4 md:px-5 md:text-xl">
          Contact me now and scale your business
        </span>
      </motion.div>
      <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="container mx-auto px-6 py-10">
        <div className="lg:-mx-6 lg:flex lg:items-center">
          <div className="lg:mx-0 lg:mt-0 lg:flex lg:w-1/2 lg:flex-col lg:items-center">
            <div className="mt-6 space-y-8 md:mt-8">
              <p className="-mx-2 flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-base-400 mx-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
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

                <span className="mx-2 w-72 truncate font-urbanist text-base-content">
                  Miami, Queensland, Australia
                </span>
              </p>

              <p className="-mx-2 flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-base-400 mx-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                <span className="mx-2 w-72 truncate font-SUSE text-base-content">
                  +61484305049
                </span>
              </p>

              <p className="-mx-2 flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-base-400 mx-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <span className="mx-2 w-72 truncate font-SUSE text-base-content">
                  bookings.machado@gmail.com
                </span>
              </p>
            </div>

            <div className="mt-6 w-80 md:mt-8">
              <h3 className="text-base-400 ">Follow me</h3>

              <div className="-mx-1.5 mt-4 flex ">
                <a
                  className="btn mx-1.5 rounded-full bg-base-100"
                  href="https://x.com/ASMWebDev"
                  aria-label="twitter"
                  target="_blank"
                  rel="noopener noreferrer">
                  <svg
                    className="h-10 w-10 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.6668 6.67334C18.0002 7.00001 17.3468 7.13268 16.6668 7.33334C15.9195 6.49001 14.8115 6.44334 13.7468 6.84201C12.6822 7.24068 11.9848 8.21534 12.0002 9.33334V10C9.83683 10.0553 7.91016 9.07001 6.66683 7.33334C6.66683 7.33334 3.87883 12.2887 9.3335 14.6667C8.0855 15.498 6.84083 16.0587 5.3335 16C7.53883 17.202 9.94216 17.6153 12.0228 17.0113C14.4095 16.318 16.3708 14.5293 17.1235 11.85C17.348 11.0351 17.4595 10.1932 17.4548 9.34801C17.4535 9.18201 18.4615 7.50001 18.6668 6.67268V6.67334Z" />
                  </svg>
                </a>

                <a
                  className="btn mx-1.5 rounded-full bg-base-100"
                  href="https://www.linkedin.com/in/alexandre-machado-664884249/"
                  aria-label="linkedin"
                  target="_blank"
                  rel="noopener noreferrer">
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.2 8.80005C16.4731 8.80005 17.694 9.30576 18.5941 10.2059C19.4943 11.1061 20 12.327 20 13.6V19.2H16.8V13.6C16.8 13.1757 16.6315 12.7687 16.3314 12.4687C16.0313 12.1686 15.6244 12 15.2 12C14.7757 12 14.3687 12.1686 14.0687 12.4687C13.7686 12.7687 13.6 13.1757 13.6 13.6V19.2H10.4V13.6C10.4 12.327 10.9057 11.1061 11.8059 10.2059C12.7061 9.30576 13.927 8.80005 15.2 8.80005Z"
                      fill="currentColor"
                    />
                    <path d="M7.2 9.6001H4V19.2001H7.2V9.6001Z" fill="currentColor" />
                    <path
                      d="M5.6 7.2C6.48366 7.2 7.2 6.48366 7.2 5.6C7.2 4.71634 6.48366 4 5.6 4C4.71634 4 4 4.71634 4 5.6C4 6.48366 4.71634 7.2 5.6 7.2Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a
                  className="btn mx-1.5 rounded-full bg-base-100"
                  href="https://github.com/LXMachado"
                  aria-label="github"
                  target="_blank"
                  rel="noopener noreferrer">
                  <svg
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12C2 16.991 5.157 21.128 9.615 22.578C10.115 22.668 10.3 22.344 10.3 22.063C10.3 21.809 10.291 21.065 10.286 20.175C7.269 20.821 6.639 18.725 6.639 18.725C6.14 17.476 5.42 17.153 5.42 17.153C4.421 16.495 5.49 16.507 5.49 16.507C6.595 16.578 7.178 17.595 7.178 17.595C8.153 19.208 9.883 18.772 10.318 18.503C10.407 17.819 10.668 17.384 10.956 17.131C8.533 16.875 5.985 15.961 5.985 11.744C5.985 10.566 6.417 9.603 7.199 8.849C7.098 8.581 6.713 7.462 7.298 5.85C7.298 5.85 8.219 5.567 10.275 6.924C11.147 6.691 12.084 6.575 13.015 6.571C13.945 6.575 14.881 6.691 15.755 6.924C17.809 5.567 18.728 5.85 18.728 5.85C19.315 7.462 18.93 8.581 18.829 8.849C19.613 9.603 20.041 10.566 20.041 11.744C20.041 15.973 17.489 16.872 15.058 17.122C15.423 17.437 15.75 18.059 15.75 19.004C15.75 20.349 15.738 21.715 15.738 22.063C15.738 22.347 15.92 22.674 16.43 22.577C20.885 21.124 24.038 16.99 24.038 12C24.038 6.477 19.561 2 14.038 2H12Z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="card mt-8 lg:mx-6 lg:w-1/2">
            <div className="card-body mx-auto w-full overflow-hidden rounded-lg px-8 py-10 shadow-xl outline outline-base-content/5 lg:max-w-xl">
              <h1 className="card-title">What do you want to ask</h1>

              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="flex-1">
                  <label htmlFor="name" className="mb-2 block text-sm">
                    Full Name
                  </label>
                  <input
                    id="name"
                    autoComplete="name"
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered w-full"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mt-6 flex-1">
                  <label htmlFor="email" className="mb-2 block text-sm">
                    Email address
                  </label>
                  <input
                    id="email"
                    autoComplete="email"
                    type="email"
                    placeholder="abcd@example.com"
                    className="input input-bordered w-full"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mt-6 w-full">
                  <label htmlFor="message" className="mb-2 block text-sm">
                    Message
                  </label>
                  <textarea
                    id="message"
                    autoComplete="message"
                    className="textarea textarea-bordered w-full"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button 
                  className="btn btn-neutral mt-6 w-full transform px-6 py-3 text-sm font-medium capitalize duration-300"
                  disabled={submitStatus === 'submitting'}
                >
                  {submitStatus === 'submitting' ? 'Sending...' : 'Get in touch'}
                </button>

                {submitStatus === 'success' && (
                  <p className="mt-4 text-green-500">Message sent successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p className="mt-4 text-red-500">Failed to send message. Please try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="flex items-center justify-center py-10 font-urbanist text-sm lg:text-lg">
        <h1>© 2024 Alexandre Machado. All rights reserved.</h1>
      </div>
    </motion.section>
  )
}

export default Contact