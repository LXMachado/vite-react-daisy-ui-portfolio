import React from "react"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "../utils/motion"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Navigation, Autoplay, Pagination, Mousewheel, Keyboard } from "swiper/modules"
const testimonials = [
  {
    name: "Emily Chen",
    position: "Startup Founder",
    quote:
      "Alexandre's full-stack development skills transformed our startup's online presence. The seamless integration of front-end and back-end technologies resulted in a robust, user-friendly platform that has significantly boosted our user engagement.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Michael Rodriguez",
    position: "E-commerce Manager",
    quote:
      "The custom e-commerce solution Alexandre developed for us has revolutionized our online sales. The intuitive UI and robust backend have streamlined our operations and significantly improved our conversion rates.",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Sarah Thompson",
    position: "Non-profit Director",
    quote: 
      "Alexandre's web development expertise was crucial in creating our organization's new website. The responsive design and efficient content management system have made it much easier for us to reach our audience and manage our online presence.",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Daniel Lee",
    position: "Tech Entrepreneur",
    quote:
      "Working with Alexandre on our web app was a game-changer. His expertise in both frontend and backend technologies resulted in a sleek, high-performance application that our users love. His attention to detail and problem-solving skills are truly impressive.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]
const Testimonial = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      id="testimonial"
      className="my-20 flex flex-col items-center justify-center md:my-32">
      <motion.div
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="flex flex-col items-center justify-center">
        <h1 className="text-center font-heading text-3xl font-semibold text-slate-900 md:text-5xl dark:text-ink">
          Testimonials
        </h1>
        <span className="text-md mt-2 px-2 font-body text-slate-600 md:mt-4 md:px-5 md:text-xl dark:text-ink-muted">
          What My Clients Says About Me
        </span>
      </motion.div>

      <motion.div variants={fadeIn("up", "tween", 0.2, 1)} className="py-10 max-w-7xl">
        <Swiper
          cssMode={true}
          navigation={false}
          pagination={{clickable:true}}
          mousewheel={true}
          keyboard={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          modules={[Navigation, Autoplay, Pagination, Mousewheel, Keyboard]}
          className="container mx-4 h-96 rounded-xl border border-slate-200 bg-white/80 shadow-[0_35px_70px_-45px_rgba(15,23,42,0.4)] backdrop-blur max-sm:max-w-sm dark:border-surface-border/60 dark:bg-surface/80 dark:shadow-inner-glow">
          {testimonials.map((item, index) => (
            <SwiperSlide className="h-full" key={index}>
              <div className="flex h-full items-center justify-center">
                <figure className="mx-10 mt-10">
                  <blockquote className="text-center font-heading text-lg font-semibold leading-8 text-slate-800 lg:text-3xl dark:text-ink">
                    <p>“{item.quote}”</p>
                  </blockquote>
                  <div className="mt-10 flex flex-col items-center">
                    <img
                      className="mx-auto h-14 w-14 rounded-full"
                      src={item.image}
                      alt={item.name}
                    />
                    <div className="mt-4 flex justify-center gap-2 text-sm font-medium text-slate-700 lg:tracking-widest dark:text-ink">
                      <div>{item.name}</div>
                      <div className="text-slate-500 dark:text-ink-muted">{item.position}</div>
                    </div>
                  </div>
                </figure>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.div>
  )
}

export default Testimonial
