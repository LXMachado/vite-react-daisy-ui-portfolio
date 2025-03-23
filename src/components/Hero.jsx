import React, { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

const Hero = () => {
  const shouldReduceMotion = useReducedMotion()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = shouldReduceMotion ? {} : {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const imageVariants = shouldReduceMotion ? {} : {
    hidden: { scale: 0.8, rotateY: -180 },
    visible: {
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  }

  return (
    <motion.div
      className="min-h-screen relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse items-center justify-between w-full max-w-7xl">
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            variants={imageVariants}
          >
            {isClient && (
              <motion.img
                src="/images/img/AM.png"
                alt="Profile"
                loading="lazy"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotateY: 10 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              />
            )}
          </motion.div>
          <motion.div 
            className="lg:w-1/2 text-left"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-5xl font-bold mb-4 font-SUSE"
              variants={itemVariants}
            >
              Hello! I'm Alexandre,
            </motion.h1>
            <motion.p 
              className="mb-6 max-w-md font-SUSE"
              variants={itemVariants}
            >
              a full-stack web developer specializing in modern, responsive websites and applications. 
              With a strong foundation in JavaScript, React, Node.js, and Express, I bring a hands-on approach to delivering seamless digital experiences. Whether it's building from the ground up or enhancing existing projects, I'm here to help you achieve your goals with clean, efficient code and a commitment to quality.
            </motion.p>
            <motion.div 
              className="flex space-x-4"
              variants={itemVariants}
            >
              <motion.button 
                className="btn btn-neutral"
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                onClick={scrollToContact}
              >
                Let's Talk
              </motion.button>
              <motion.a 
                href="https://docs.google.com/document/d/1j0EnYcWyKMXBfziO7Z2yv-8NPur2GTBrzO2n0O_C2DM/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              >
                Download my CV
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default Hero
