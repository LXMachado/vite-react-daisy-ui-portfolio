import React, { useState } from "react"

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
  const [visibleServices, setVisibleServices] = useState(3)

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
    <section id="services" className="section-shell">
      <div className="section-header">
        <h2 className="section-title">Services</h2>
        <p className="section-subtitle">My comprehensive range of services</p>
      </div>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, visibleServices).map((item, index) => (
          <div
            key={index}
            className="service-card group"
            onClick={handleServiceClick}
          >
            <div className="flex items-start gap-4">
              <span className="service-icon">
                <img className="h-8 w-8 object-contain" src={item.icon} alt={item.name} loading="lazy" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink sm:text-xl">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">{item.description}</p>
              </div>
            </div>
            <span className="service-cta">Discuss this service →</span>
          </div>
        ))}
      </div>
      {visibleServices < services.length && (
        <div className="mt-8 flex justify-center">
          <button onClick={loadMore} className="button-secondary">
            Load More
          </button>
        </div>
      )}
    </section>
  )
}

export default Services
