"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Calendar, Users, MessageSquare, Bell, Sun, Moon } from "lucide-react"
import { useTheme } from "@/context/theme-context"

interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  openLoginModal: () => void
  openSignupModal: () => void
}

export default function Navbar({ activeSection, setActiveSection, openLoginModal, openSignupModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", section: "home", icon: <Users size={18} /> },
    { name: "Calendar", section: "calendar", icon: <Calendar size={18} /> },
    { name: "Event Ideas", section: "suggestions", icon: <MessageSquare size={18} /> },
    { name: "Pricing", section: "pricing", icon: <Bell size={18} /> },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800/20" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <motion.div
              className="text-2xl font-bold text-gray-900 dark:text-white flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => setActiveSection("home")}
            >
              <span className="text-emerald-600 dark:text-emerald-400 mr-1">Event</span>
              <span>Together</span>
            </motion.div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <motion.button
                key={link.section}
                className={`px-4 py-2 rounded-md flex items-center space-x-1 ${
                  activeSection === link.section
                    ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setActiveSection(link.section)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
                <span>{link.name}</span>
              </motion.button>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openLoginModal}
            >
              Log in
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-emerald-600 text-white rounded-md shadow-md hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openSignupModal}
            >
              Sign up
            </motion.button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              className="p-2 rounded-md text-gray-700 dark:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-800/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navLinks.map((link) => (
                <motion.button
                  key={link.section}
                  className={`px-4 py-3 rounded-md flex items-center space-x-2 ${
                    activeSection === link.section
                      ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => {
                    setActiveSection(link.section)
                    setIsMobileMenuOpen(false)
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </motion.button>
              ))}
              <div className="pt-2 flex flex-col space-y-2">
                <motion.button
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    openLoginModal()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Log in
                </motion.button>
                <motion.button
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md shadow-md dark:bg-emerald-500"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    openSignupModal()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  Sign up
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
