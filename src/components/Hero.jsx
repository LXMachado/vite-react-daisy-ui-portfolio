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

  return (
    <motion.section
      className="relative isolate overflow-hidden px-6 py-24 sm:px-10 sm:py-28"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      id="hero"
    >
      <div className="absolute inset-0 -z-30 bg-noise bg-[length:120px_120px] opacity-20" aria-hidden="true"></div>
      <div className="absolute inset-x-0 -top-40 -z-40 h-96 blur-3xl" aria-hidden="true">
        <div className="mx-auto h-full max-w-4xl animate-gradient-pan rounded-full bg-gradient-to-r from-sky-500/40 via-indigo-500/30 to-purple-500/40 opacity-60"></div>
      </div>
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:min-h-[70vh] lg:grid-cols-2 lg:gap-16">
        <motion.div
          className="order-1 w-full space-y-8 text-left lg:order-none"
          variants={itemVariants}
        >
          <motion.span
            className="inline-flex items-center rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:border-white/10 dark:text-ink/60"
            variants={itemVariants}
          >
            Full-stack developer · product-minded engineer
          </motion.span>
          <motion.h1
            className="text-5xl font-heading font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-[4.25rem] lg:leading-[1.05] xl:text-[4.75rem] dark:text-ink"
            variants={itemVariants}
          >
            Hello! I'm Alexandre,
          </motion.h1>
          <motion.p
            className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-[1.9] dark:text-ink/75"
            variants={itemVariants}
          >
            a full-stack web developer focused on crafting intuitive, high-performing digital products. I translate complex ideas into elegant solutions, partnering with teams to launch, iterate, and scale with confidence.
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
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 px-8 py-3.5 text-base font-semibold text-slate-700 transition hover:border-sky-400 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 dark:border-white/30 dark:text-ink/80 dark:hover:border-white/60 dark:hover:text-ink dark:focus-visible:outline-white/40"
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
            className="order-2 flex w-full items-center justify-center lg:order-none"
            variants={imageVariants}
          >
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-slate-100 via-white to-slate-100 p-6 shadow-[0_40px_75px_-45px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-gradient-to-br dark:from-slate-900/70 dark:via-slate-900/30 dark:to-slate-900/10 dark:shadow-xl dark:shadow-black/20 sm:max-w-md">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/15 via-cyan-500/10 to-indigo-500/15 opacity-70 dark:from-teal-500/20 dark:via-sky-500/10 dark:to-purple-500/20" aria-hidden="true" />
              <Suspense fallback={<div className="absolute inset-0 rounded-[2.5rem] bg-slate-200/80 dark:bg-slate-900/60" aria-hidden="true" />}>
                <HeroCanvas reduceMotion={shouldReduceMotion} />
              </Suspense>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

export default Hero
