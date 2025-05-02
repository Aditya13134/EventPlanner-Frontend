"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface HeroProps {
  setActiveSection: (section: string) => void
}

export default function Hero({ setActiveSection }: HeroProps) {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            className="lg:w-1/2 lg:pr-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.span
              className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Simplified Group Planning
            </motion.span>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Plan events together, <span className="text-emerald-600">effortlessly</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              EventTogether makes it simple for small groups to coordinate events, track RSVPs, and keep everyone in the
              loop with friendly reminders.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button
                className="px-8 py-3 bg-emerald-600 text-white rounded-md shadow-md text-lg font-medium hover:bg-emerald-700"
                onClick={() => setActiveSection("calendar")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try it free
              </motion.button>
              <motion.button
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-md text-lg font-medium hover:bg-gray-50"
                onClick={() => setActiveSection("suggestions")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See how it works
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -top-6 -left-6 w-full h-full bg-emerald-200 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              <motion.div
                className="relative bg-white p-6 rounded-xl shadow-xl overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Event planning dashboard"
                  width={600}
                  height={500}
                  className="rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-20" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Team Offsite</h3>
                      <p className="text-sm text-gray-600">Friday, May 10 • 12 people attending</p>
                    </div>
                    <motion.button
                      className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-md"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      RSVP
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
