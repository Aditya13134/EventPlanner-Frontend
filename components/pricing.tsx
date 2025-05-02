"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for small groups just getting started",
      features: [
        "Up to 5 group members",
        "10 events per month",
        "Basic event suggestions",
        "Simple RSVP tracking",
        "Email notifications",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "For active groups that plan regularly",
      features: [
        "Up to 20 group members",
        "Unlimited events",
        "Advanced event suggestions",
        "Detailed RSVP tracking",
        "Custom reminders",
        "Polls and voting",
        "Calendar sync",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Team",
      price: "$24.99",
      period: "per month",
      description: "For organizations and larger communities",
      features: [
        "Unlimited group members",
        "Unlimited events",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "Multiple group management",
        "Advanced permissions",
      ],
      cta: "Contact Sales",
      popular: false,
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
    <div className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the plan that's right for your group. All plans include a 14-day free trial.
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`bg-white rounded-xl shadow-md overflow-hidden ${
              plan.popular ? "ring-2 ring-emerald-500 shadow-xl" : ""
            }`}
            variants={item}
          >
            {plan.popular && (
              <div className="bg-emerald-500 text-white text-center py-1.5 text-sm font-medium">Most Popular</div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <motion.button
                className={`w-full py-2 rounded-md font-medium mb-6 ${
                  plan.popular
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {plan.cta}
              </motion.button>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-16 text-center max-w-3xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-2">Need something custom?</h3>
        <p className="text-gray-600 mb-6">
          We offer custom solutions for larger organizations with specific needs. Contact our sales team to learn more.
        </p>
        <motion.button
          className="px-6 py-2.5 bg-gray-900 text-white rounded-md font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Sales
        </motion.button>
      </motion.div>
    </div>
  )
}
