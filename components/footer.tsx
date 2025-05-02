"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"

interface FooterProps {
  setActiveSection: (section: string) => void
}

export default function Footer({ setActiveSection }: FooterProps) {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", section: "home" },
        { name: "Calendar", section: "calendar" },
        { name: "Event Ideas", section: "suggestions" },
        { name: "Pricing", section: "pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", section: "home" },
        { name: "Careers", section: "home" },
        { name: "Blog", section: "home" },
        { name: "Press", section: "home" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", section: "home" },
        { name: "Community", section: "home" },
        { name: "Webinars", section: "home" },
        { name: "Partners", section: "home" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", section: "home" },
        { name: "Terms of Service", section: "home" },
        { name: "Cookie Policy", section: "home" },
        { name: "GDPR", section: "home" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Twitter size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "#" },
    { icon: <Mail size={20} />, href: "#" },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <motion.div
              className="text-2xl font-bold mb-4 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-emerald-400 mr-1">Event</span>
              <span>Together</span>
            </motion.div>
            <p className="text-gray-400 mb-6 max-w-xs">
              Making group event planning simple, collaborative, and stress-free.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="w-10 h-10 rounded-full bg-gray-800 dark:bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-emerald-600 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="font-semibold text-lg mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.button
                      className="text-gray-400 hover:text-emerald-400"
                      onClick={() => setActiveSection(link.section)}
                      whileHover={{ x: 3 }}
                    >
                      {link.name}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EventTogether. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-gray-500 text-sm hover:text-emerald-400">
              Privacy
            </Link>
            <Link href="#" className="text-gray-500 text-sm hover:text-emerald-400">
              Terms
            </Link>
            <Link href="#" className="text-gray-500 text-sm hover:text-emerald-400">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
