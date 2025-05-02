"use client"

import { motion } from "framer-motion"
import { Calendar, Users, MessageSquare, Bell, CheckCircle, Clock } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <Calendar className="w-10 h-10 text-emerald-600" />,
      title: "Shared Calendar",
      description: "Keep everyone on the same page with a centralized calendar that shows all upcoming events.",
    },
    {
      icon: <MessageSquare className="w-10 h-10 text-emerald-600" />,
      title: "Event Suggestions",
      description: "Easily suggest new event ideas and let the group vote on their favorites.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-emerald-600" />,
      title: "RSVP Tracking",
      description: "See who's attending at a glance with simple RSVP management and attendee counts.",
    },
    {
      icon: <Bell className="w-10 h-10 text-emerald-600" />,
      title: "Smart Reminders",
      description: "Never miss an event with friendly, automated reminders sent at just the right time.",
    },
    {
      icon: <Users className="w-10 h-10 text-emerald-600" />,
      title: "Group Management",
      description: "Create multiple groups for different circles of friends, family, or colleagues.",
    },
    {
      icon: <Clock className="w-10 h-10 text-emerald-600" />,
      title: "Availability Finder",
      description: "Find the perfect time that works for everyone with our availability matcher.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need for seamless group planning
          </h2>
          <p className="text-xl text-gray-600">
            Our intuitive features make coordinating events with friends, family, or colleagues a breeze.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={item}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
