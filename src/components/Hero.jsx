import React, { Suspense, lazy, useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

const HeroCanvas = lazy(() => import("./HeroCanvas"))

const Hero = () => {
  const shouldReduceMotion = useReducedMotion()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const containerVariants = shouldReduceMotion ? {} : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = shouldReduceMotion ? {} : {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const imageVariants = shouldReduceMotion ? {} : {
    hidden: { scale: 0.8, rotateY: -180 },
    visible: {
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  }

  const backgroundFallback = (
    <div
      className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-accent/20 via-highlight/10 to-amberglow/10"
      aria-hidden="true"
    />
  )

  return (
    <motion.section
      className="relative isolate overflow-hidden px-6 py-24 sm:px-10 sm:py-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="hero"
    >
      <div className="absolute inset-0 -z-30 bg-noise bg-[length:120px_120px] opacity-30"></div>
      <div className="absolute inset-x-0 -top-20 -z-40 h-72 blur-3xl" aria-hidden="true">
        <div className="mx-auto h-full max-w-3xl animate-gradient-pan rounded-full bg-gradient-to-br from-accent/40 via-highlight/40 to-amberglow/40 opacity-70"></div>
      </div>
      <div className="absolute inset-0 -z-20">
        {isClient && !shouldReduceMotion ? (
          <Suspense fallback={backgroundFallback}>
            <HeroCanvas reduceMotion={shouldReduceMotion} />
          </Suspense>
        ) : (
          backgroundFallback
        )}
      </div>
      <div className="relative mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-end lg:gap-24">
        <motion.div
          className="relative w-full max-w-2xl space-y-6 text-left"
          variants={itemVariants}
        >
          <motion.span className="hero-kicker" variants={itemVariants}>
            Full-stack developer & product-minded engineer
          </motion.span>
          <motion.h1
            className="text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl"
            variants={itemVariants}
          >
            Hello! I'm Alexandre,
          </motion.h1>
          <motion.p
            className="max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
            variants={itemVariants}
          >
            a full-stack web developer specializing in modern, responsive websites and applications. With a strong foundation in JavaScript, React, Node.js, and Express, I bring a hands-on approach to delivering seamless digital experiences. Whether it's building from the ground up or enhancing existing projects, I'm here to help you achieve your goals with clean, efficient code and a commitment to quality.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <motion.button
              className="button-primary"
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              onClick={scrollToContact}
            >
              Let's Talk
            </motion.button>
            <motion.a
              href="https://docs.google.com/document/d/1j0EnYcWyKMXBfziO7Z2yv-8NPur2GTBrzO2n0O_C2DM/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            >
              Download my CV
            </motion.a>
          </motion.div>
        </motion.div>
        {isClient && (
          <motion.div
            className="relative flex w-full max-w-sm justify-center lg:max-w-[420px]"
            variants={imageVariants}
          >
            <motion.img
              src="/images/img/AM.png"
              alt="Profile"
              loading="lazy"
              className="hero-portrait"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotateY: 10 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            />
            <span className="hero-portrait-ring" aria-hidden="true" />
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

export default Hero
