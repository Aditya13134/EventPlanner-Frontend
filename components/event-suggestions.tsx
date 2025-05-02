"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, ThumbsUp, MessageCircle, Calendar, MapPin, ImageIcon } from "lucide-react"
import { useEventContext } from "@/context/event-context"
import Image from "next/image"

export default function EventSuggestions() {
  const { suggestions, addSuggestion, voteSuggestion, addComment } = useEventContext()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    proposedDate: "",
    proposedLocation: "",
    image: "",
  })
  const [commentText, setCommentText] = useState("")
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addSuggestion({
      id: Date.now().toString(),
      ...formData,
      votes: [],
      comments: [],
      createdBy: "current-user",
      createdAt: new Date().toISOString(),
    })

    setFormData({
      title: "",
      description: "",
      proposedDate: "",
      proposedLocation: "",
      image: "",
    })

    setShowForm(false)
  }

  const handleVote = (suggestionId: string) => {
    voteSuggestion(suggestionId, "current-user")
  }

  const handleCommentSubmit = (suggestionId: string) => {
    if (commentText.trim()) {
      addComment(suggestionId, {
        id: Date.now().toString(),
        text: commentText,
        userId: "current-user",
        timestamp: new Date().toISOString(),
      })
      setCommentText("")
      setActiveCommentId(null)
    }
  }

  return (
    <div className="pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Event Ideas</h1>
          <p className="text-gray-600 dark:text-gray-400">Suggest and vote on event ideas for your group</p>
        </div>
        <motion.button
          className="flex items-center space-x-1 px-4 py-2 bg-emerald-600 dark:bg-emerald-500 text-white rounded-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Suggest Event</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Suggest a New Event</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
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

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="proposedDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Proposed Date
                    </label>
                    <input
                      type="date"
                      id="proposedDate"
                      name="proposedDate"
                      value={formData.proposedDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="proposedLocation"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Proposed Location
                    </label>
                    <input
                      type="text"
                      id="proposedLocation"
                      name="proposedLocation"
                      value={formData.proposedLocation}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Image URL (optional)
                  </label>
                  <div className="flex">
                    <div className="relative flex-grow">
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
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Leave blank to use a default image</p>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <motion.button
                    type="button"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 dark:bg-emerald-500 text-white rounded-md"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Submit Suggestion
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-6">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <motion.div
              key={suggestion.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image
                  src={
                    suggestion.image ||
                    `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(suggestion.title)}`
                  }
                  alt={suggestion.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white">{suggestion.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-gray-600 dark:text-gray-400">{suggestion.description}</p>
                  <motion.button
                    className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm ${
                      suggestion.votes.includes("current-user")
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(suggestion.id)}
                    disabled={suggestion.votes.includes("current-user")}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{suggestion.votes.length}</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {suggestion.proposedDate && (
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span>
                        {new Date(suggestion.proposedDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )}

                  {suggestion.proposedLocation && (
                    <div className="flex items-center text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span>{suggestion.proposedLocation}</span>
                    </div>
                  )}
                </div>

                <div className="border-t dark:border-gray-700 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Comments ({suggestion.comments.length})
                    </h4>
                    <motion.button
                      className="flex items-center space-x-1 text-sm text-emerald-600 dark:text-emerald-400"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveCommentId(activeCommentId === suggestion.id ? null : suggestion.id)}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Add Comment</span>
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {activeCommentId === suggestion.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4"
                      >
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add your comment..."
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
                          />
                          <motion.button
                            className="px-4 py-2 bg-emerald-600 dark:bg-emerald-500 text-white rounded-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCommentSubmit(suggestion.id)}
                          >
                            Post
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-3">
                    {suggestion.comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {comment.userId === "current-user" ? "You" : "User"}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.timestamp).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No event suggestions yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Be the first to suggest an event for your group!</p>
            <motion.button
              className="inline-flex items-center space-x-1 px-4 py-2 bg-emerald-600 dark:bg-emerald-500 text-white rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
            >
              <Plus className="w-4 h-4" />
              <span>Suggest Event</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
