"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X, Calendar, Users, MessageSquare, Bell, Sun, Moon, ChevronLeft, ChevronRight, Plus, MapPin, Clock, Check, Image as ImageIcon } from "lucide-react"

// =============================================================================
// Context Providers
// =============================================================================

// Theme Context
type Theme = "light" | "dark"

type ThemeContextType = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")

  // Initialize theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (prefersDark) {
      setTheme("dark")
    }
  }, [])

  // Update document when theme changes
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Event Context
// Types
type Attendee = {
  userId: string
  status: "going" | "maybe" | "not-going"
  timestamp: string
}

type Comment = {
  id: string
  text: string
  userId: string
  timestamp: string
}

type Event = {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  type: "social" | "work" | "family"
  image?: string
  attendees: Attendee[]
  createdBy: string
  createdAt: string
}

type Suggestion = {
  id: string
  title: string
  description: string
  proposedDate: string
  proposedLocation: string
  image?: string
  votes: string[]
  comments: Comment[]
  createdBy: string
  createdAt: string
}

type EventContextType = {
  events: Event[]
  suggestions: Suggestion[]
  addEvent: (event: Event) => void
  addRsvp: (eventId: string, attendee: Attendee) => void
  addSuggestion: (suggestion: Suggestion) => void
  voteSuggestion: (suggestionId: string, userId: string) => void
  addComment: (suggestionId: string, comment: Comment) => void
}

// Dummy data with images
const dummyEvents: Event[] = [
  {
    id: "1",
    title: "Team Offsite",
    date: "2025-05-10",
    time: "12:00 PM",
    location: "Central Park",
    description: "Annual team building event with outdoor activities and lunch.",
    type: "work",
    image: "/placeholder.svg?height=300&width=500&text=Team+Offsite",
    attendees: [
      { userId: "user1", status: "going", timestamp: "2025-04-15T10:30:00Z" },
      { userId: "user2", status: "going", timestamp: "2025-04-16T14:20:00Z" },
      { userId: "user3", status: "maybe", timestamp: "2025-04-17T09:15:00Z" },
    ],
    createdBy: "user1",
    createdAt: "2025-04-10T08:00:00Z",
  },
  {
    id: "2",
    title: "Movie Night",
    date: "2025-05-15",
    time: "7:00 PM",
    location: "Alex's Place",
    description: "Watching the latest sci-fi movie with snacks and drinks.",
    type: "social",
    image: "/placeholder.svg?height=300&width=500&text=Movie+Night",
    attendees: [
      { userId: "user1", status: "going", timestamp: "2025-04-20T11:45:00Z" },
      { userId: "user4", status: "going", timestamp: "2025-04-21T16:30:00Z" },
      { userId: "user5", status: "not-going", timestamp: "2025-04-22T13:10:00Z" },
    ],
    createdBy: "user4",
    createdAt: "2025-04-18T19:30:00Z",
  },
  {
    id: "3",
    title: "Birthday Celebration",
    date: "2025-05-20",
    time: "6:30 PM",
    location: "Riverside Restaurant",
    description: "Celebrating Sarah's birthday with dinner and cake.",
    type: "social",
    image: "/placeholder.svg?height=300&width=500&text=Birthday+Party",
    attendees: [
      { userId: "user1", status: "going", timestamp: "2025-04-25T10:00:00Z" },
      { userId: "user2", status: "going", timestamp: "2025-04-26T15:20:00Z" },
      { userId: "user3", status: "going", timestamp: "2025-04-27T12:45:00Z" },
      { userId: "user4", status: "going", timestamp: "2025-04-28T09:30:00Z" },
    ],
    createdBy: "user2",
    createdAt: "2025-04-24T14:15:00Z",
  },
  {
    id: "4",
    title: "Product Launch",
    date: "2025-06-05",
    time: "10:00 AM",
    location: "Conference Center",
    description: "Launching our new product with presentations and demos.",
    type: "work",
    image: "/placeholder.svg?height=300&width=500&text=Product+Launch",
    attendees: [
      { userId: "user1", status: "going", timestamp: "2025-05-10T08:20:00Z" },
      { userId: "user2", status: "going", timestamp: "2025-05-11T11:30:00Z" },
      { userId: "user3", status: "maybe", timestamp: "2025-05-12T14:45:00Z" },
      { userId: "user5", status: "not-going", timestamp: "2025-05-13T16:00:00Z" },
    ],
    createdBy: "user1",
    createdAt: "2025-05-01T09:00:00Z",
  },
]

const dummySuggestions = [
  {
    id: "1",
    title: "Hiking Trip",
    description: "Weekend hiking trip to the mountains with picnic lunch.",
    proposedDate: "2025-06-15",
    proposedLocation: "Mountain Trails Park",
    image: "/placeholder.svg?height=300&width=500&text=Hiking+Trip",
    votes: ["user2", "user3", "user4"],
    comments: [
      {
        id: "c1",
        text: "Sounds fun! I have some great trail recommendations.",
        userId: "user2",
        timestamp: "2025-05-02T10:15:00Z",
      },
      {
        id: "c2",
        text: "I can bring some snacks for everyone.",
        userId: "user4",
        timestamp: "2025-05-03T14:30:00Z",
      },
    ],
    createdBy: "user3",
    createdAt: "2025-05-01T16:45:00Z",
  },
  {
    id: "2",
    title: "Board Game Night",
    description: "Evening of board games, pizza, and drinks.",
    proposedDate: "2025-06-10",
    proposedLocation: "Community Center",
    image: "/placeholder.svg?height=300&width=500&text=Board+Games",
    votes: ["user1", "user5"],
    comments: [
      {
        id: "c3",
        text: "I can bring Catan and Ticket to Ride!",
        userId: "user1",
        timestamp: "2025-05-05T19:20:00Z",
      },
    ],
    createdBy: "user5",
    createdAt: "2025-05-04T20:10:00Z",
  },
  {
    id: "3",
    title: "Beach Day",
    description: "Let's spend a day at the beach with volleyball and swimming.",
    proposedDate: "2025-07-05",
    proposedLocation: "Sunny Beach",
    image: "/placeholder.svg?height=300&width=500&text=Beach+Day",
    votes: ["user1", "user2", "user3"],
    comments: [
      {
        id: "c4",
        text: "I'll bring the volleyball!",
        userId: "user1",
        timestamp: "2025-05-10T15:30:00Z",
      },
      {
        id: "c5",
        text: "Don't forget sunscreen everyone!",
        userId: "user3",
        timestamp: "2025-05-11T09:45:00Z",
      },
    ],
    createdBy: "user2",
    createdAt: "2025-05-08T11:20:00Z",
  },
]

const EventContext = createContext<EventContextType | undefined>(undefined)

function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(dummyEvents)
  const [suggestions, setSuggestions] = useState<Suggestion[]>(dummySuggestions)

  const addEvent = (event: Event) => {
    // Add a default image if none provided
    const newEvent = {
      ...event,
      image: event.image || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(event.title)}`,
    }
    setEvents((prev) => [newEvent, ...prev])
  }

  const addRsvp = (eventId: string, attendee: Attendee) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id === eventId) {
          // Remove existing RSVP from the same user if it exists
          const filteredAttendees = event.attendees.filter((a) => a.userId !== attendee.userId)
          return {
            ...event,
            attendees: [...filteredAttendees, attendee],
          }
        }
        return event
      }),
    )
  }

  const addSuggestion = (suggestion: Suggestion) => {
    // Add a default image if none provided
    const newSuggestion = {
      ...suggestion,
      image: suggestion.image || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(suggestion.title)}`,
    }
    setSuggestions((prev) => [newSuggestion, ...prev])
  }

  const voteSuggestion = (suggestionId: string, userId: string) => {
    setSuggestions((prev) =>
      prev.map((suggestion) => {
        if (suggestion.id === suggestionId) {
          // Toggle vote
          const hasVoted = suggestion.votes.includes(userId)
          if (hasVoted) {
            return {
              ...suggestion,
              votes: suggestion.votes.filter((id) => id !== userId),
            }
          } else {
            return {
              ...suggestion,
              votes: [...suggestion.votes, userId],
            }
          }
        }
        return suggestion
      }),
    )
  }

  const addComment = (suggestionId: string, comment: Comment) => {
    setSuggestions((prev) =>
      prev.map((suggestion) => {
        if (suggestion.id === suggestionId) {
          return {
            ...suggestion,
            comments: [...suggestion.comments, comment],
          }
        }
        return suggestion
      }),
    )
  }

  return (
    <EventContext.Provider
      value={{
        events,
        suggestions,
        addEvent,
        addRsvp,
        addSuggestion,
        voteSuggestion,
        addComment,
      }}
    >
      {children}
    </EventContext.Provider>
  )
}

function useEventContext() {
  const context = useContext(EventContext)
  if (context === undefined) {
    throw new Error("useEventContext must be used within an EventProvider")
  }
  return context
}

// =============================================================================
// Components
// =============================================================================

// Navbar Component
interface NavbarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  openLoginModal: () => void
  openSignupModal: () => void
}

// EventModal Component
interface EventModalProps {
  event: any | null
  onClose: () => void
  onRsvp: (eventId: string, status: "going" | "maybe" | "not-going") => void
}

function EventModal({ event, onClose, onRsvp }: EventModalProps) {
  const { addEvent } = useEventContext()
  const [formData, setFormData] = useState({
    title: event?.title || "",
    date: event?.date ? new Date(event.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    time: event?.time || "18:00",
    location: event?.location || "",
    description: event?.description || "",
    type: event?.type || "social",
    image: event?.image || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!event) {
      // Creating a new event
      addEvent({
        id: Date.now().toString(),
        ...formData,
        attendees: [{ userId: "current-user", status: "going", timestamp: new Date().toISOString() }],
        createdBy: "current-user",
        createdAt: new Date().toISOString(),
      })
    }

    onClose()
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {event ? "Event Details" : "Create New Event"}
          </h2>
          <motion.button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {event ? (
          <div>
            {event.image && (
              <div className="relative h-48 w-full">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
            )}

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{event.title}</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-gray-900 dark:text-white">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-gray-900 dark:text-white">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-gray-900 dark:text-white">{event.attendees.length} people attending</p>
                  </div>
                </div>
              </div>

              {event.description && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                  <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
                </div>
              )}

              <div className="border-t dark:border-gray-700 pt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Your RSVP</h4>
                <div className="flex space-x-2">
                  <motion.button
                    className="flex-1 py-2 bg-emerald-600 dark:bg-emerald-500 text-white rounded-md flex items-center justify-center"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onRsvp(event.id, "going")}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Going
                  </motion.button>
                  <motion.button
                    className="flex-1 py-2 bg-amber-500 text-white rounded-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onRsvp(event.id, "maybe")}
                  >
                    Maybe
                  </motion.button>
                  <motion.button
                    className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onRsvp(event.id, "not-going")}
                  >
                    Decline
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date*
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Time*
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location*
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Image URL (optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ImageIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Leave blank to use a default image</p>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              >
                <option value="social">Social</option>
                <option value="work">Work</option>
                <option value="family">Family</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <motion.button
                type="button"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className="px-4 py-2 bg-emerald-600 dark:bg-emerald-500 text-white rounded-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Create Event
              </motion.button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

function Navbar({ activeSection, setActiveSection, openLoginModal, openSignupModal }: NavbarProps) {
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

// Calendar Component
function CalendarComponent() {
  const { events, addRsvp } = useEventContext()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
  }

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
    setShowEventModal(true)
  }

  const handleRsvp = (eventId: string, status: "going" | "maybe" | "not-going") => {
    addRsvp(eventId, {
      userId: "current-user",
      status,
      timestamp: new Date().toISOString(),
    })
    setShowEventModal(false)
  }

  const renderCalendarDays = () => {
    const days = []
    const today = new Date()

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-24 md:h-32 p-1 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
        ></div>,
      )
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dayEvents = getEventsForDate(date)
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear()
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentDate.getMonth() &&
        selectedDate.getFullYear() === currentDate.getFullYear()

      days.push(
        <motion.div
          key={day}
          className={`h-24 md:h-32 p-1 border border-gray-200 dark:border-gray-700 overflow-hidden ${
            isToday ? "bg-emerald-50 dark:bg-emerald-900/20" : "bg-white dark:bg-gray-800"
          } ${isSelected ? "ring-2 ring-emerald-500 dark:ring-emerald-400" : ""}`}
          whileHover={{ backgroundColor: isToday ? "#f0fdf4" : "#f9fafb", dark: { backgroundColor: "#1f2937" } }}
          onClick={() => handleDateClick(date)}
        >
          <div className="flex justify-between items-start">
            <span
              className={`inline-block w-6 h-6 text-center ${
                isToday ? "bg-emerald-500 dark:bg-emerald-600 text-white rounded-full" : "text-gray-900 dark:text-white"
              }`}
            >
              {day}
            </span>
            {dayEvents.length > 0 && (
              <span className="text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded-full">
                {dayEvents.length}
              </span>
            )}
          </div>
          <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-24px)]">
            {dayEvents.map((event, index) => (
              <motion.div
                key={index}
                className={`text-xs p-1 rounded truncate cursor-pointer ${
                  event.type === "social"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                    : event.type === "work"
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleEventClick(event)
                }}
              >
                {event.title}
              </motion.div>
            ))}
          </div>
        </motion.div>,
      )
    }

    return days
  }

  return (
    <div className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Event Calendar</h1>
        <p className="text-gray-600 dark:text-gray-400">Plan and manage your group events in one place</p>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <motion.button
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              onClick={prevMonth}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <motion.button
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
              onClick={nextMonth}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
          <motion.button
            className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 dark:bg-emerald-500 text-white rounded-md text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedEvent(null)
              setShowEventModal(true)
            }}
          >
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-7">
          {dayNames.map((day, index) => (
            <div
              key={index}
              className="py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-700"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">{renderCalendarDays()}</div>
      </div>

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Events on{" "}
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h3>

          <div className="space-y-4">
            {getEventsForDate(selectedDate).length > 0 ? (
              getEventsForDate(selectedDate).map((event, index) => (
                <motion.div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  whileHover={{ y: -2 }}
                >
                  {event.image && (
                    <div className="relative h-32 w-full">
                      <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{event.title}</h4>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                            <Clock className="w-4 h-4 mr-2" />
                            {event.time}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                            <Users className="w-4 h-4 mr-2" />
                            {event.attendees.length} attending
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <motion.button
                          className="px-3 py-1 bg-emerald-600 dark:bg-emerald-500 text-white text-sm rounded-md"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRsvp(event.id, "going")}
                        >
                          RSVP
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">
                No events scheduled for this day. Click "New Event" to add one.
              </p>
            )}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {showEventModal && (
          <EventModal event={selectedEvent} onClose={() => setShowEventModal(false)} onRsvp={handleRsvp} />
        )}
      </AnimatePresence>
    </div>
  )
}
