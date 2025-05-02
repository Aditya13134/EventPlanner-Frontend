"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Dummy data with images
const dummyEvents = [
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

const EventContext = createContext<EventContextType | undefined>(undefined)

export function EventProvider({ children }: { children: ReactNode }) {
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

export function useEventContext() {
  const context = useContext(EventContext)
  if (context === undefined) {
    throw new Error("useEventContext must be used within an EventProvider")
  }
  return context
}
