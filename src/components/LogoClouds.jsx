import React from "react"
import { motion } from "framer-motion"
import { fadeIn, staggerContainer } from "../utils/motion"

const LogoClouds = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="flex w-full items-center justify-center py-10">
      <motion.div variants={fadeIn("up", "tween", 0.2, 1)}>
        <h2 className="text-base-400 mb-12 text-center font-SUSE text-lg font-semibold leading-8">
          Technologies I like to use
        </h2>
        <div className="wrap flex flex-wrap justify-center gap-10 xl:gap-32">
          <img className="w-32 grayscale" src="/images/logo/javascript.svg" alt="google" />
          <img className="w-32 grayscale" src="/images/logo/react.svg" alt="google" />
          <img className="w-32 grayscale" src="/images/logo/nodejs.svg" alt="google" />
          <img className="w-32 grayscale" src="/images/logo/tailwind.svg" alt="google" />
          <img className="w-32 grayscale" src="/images/logo/vite.svg" alt="google" />
          <img className="w-32 grayscale" src="/images/logo/postgresql.svg" alt="google" />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LogoClouds
