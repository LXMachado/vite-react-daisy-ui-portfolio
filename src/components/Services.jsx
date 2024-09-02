import React, { useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"

const services = [
  {
    name: "Full-Stack Web Development",
    icon: "../../images/icons/digitalmarketing.png",
    description:
      "Delivering complete web solutions that integrate both front-end interfaces and back-end server functionality. I build responsive, scalable websites that provide seamless user experiences and robust back-end systems.",
  },
  {
    name: "Custom Front-End Development",
    icon: "../../images/icons/webdevelopment.png",
    description:
      "Specializing in creating dynamic, user-friendly interfaces using modern technologies like React. I ensure your website is visually appealing, highly responsive, and optimized for performance across all devices.",
  },
  {
    name: "Scalable Back-End Development",
    icon: "../../images/icons/socialmedia.png",
    description:
      "Engineering powerful server-side applications and APIs. Using technologies like Node.js and Express, I develop secure, scalable, and efficient back-end systems that support your business needs.",
  },
  {
    name: "Reliable Hosting & Domain Services",
    icon: "../../images/icons/appdevelopment.png",
    description:
      "Providing fast, reliable hosting solutions with excellent uptime. I help you find the perfect domain and ensure your website is always accessible and performing optimally for your audience.",
  },
  {
    name: "On-Page SEO Optimization",
    icon: "../../images/icons/videoediting.png",
    description:
      "Enhancing your website's visibility with on-page SEO best practices. I optimize content, meta tags, images, and structure to improve your search engine rankings and drive more organic traffic to your site.",
  },
  {
    name: "Ongoing Maintenance & Support",
    icon: "../../images/icons/consulting.png",
    description:
      "Offering continuous support and maintenance to keep your website running smoothly. From fixing bugs to updating content and adding new features, I ensure your site remains secure, up-to-date, and optimized for performance.",
  },
]


const Services = () => {
  const shouldReduceMotion = useReducedMotion()
  const [visibleServices, setVisibleServices] = useState(3)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const handleServiceClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const loadMore = () => {
    setVisibleServices(prev => Math.min(prev + 3, services.length))
  }

  return (
    <section id="services" className="mt-4 md:mt-10 px-4 md:px-8">
      <h2 className="font-SUSE text-center text-2xl font-semibold md:text-5xl mb-2 md:mb-4">
        Services
      </h2>
      <p className="text-md font-SUSE text-center mb-6 md:mb-8">
        My comprehensive range of services
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, visibleServices).map((item, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            onClick={handleServiceClick}>
            <div className="card-body">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center mr-4">
                  <img className="w-8 h-8" src={item.icon} alt={item.name} loading="lazy" />
                </div>
                <h3 className="font-SUSE card-title text-xl font-bold">{item.name}</h3>
              </div>
              <p className="text-sm font-SUSE opacity-70">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {visibleServices < services.length && (
        <div className="text-center mt-6">
          <button onClick={loadMore} className="btn btn-outline px-6 py-3 text-sm font-medium capitalize font-SUSE">
            Load More
          </button>
        </div>
      )}
    </section>
  )
}

export default Services