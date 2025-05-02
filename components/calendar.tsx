"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Plus, Users, MapPin, Clock } from "lucide-react"
import { useEventContext } from "@/context/event-context"
import EventModal from "./event-modal"
import Image from "next/image"

export default function Calendar() {
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
