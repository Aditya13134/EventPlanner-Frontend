"use client"

import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { format } from 'date-fns'

interface Event {
  id: number
  title: string
  description: string
  date: Date
  rsvp?: 'yes' | 'no'
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: new Date() })
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const handleAddEvent = () => {
    if (newEvent.title.trim()) {
      setEvents([...events, { ...newEvent, id: Date.now() }])
      setNewEvent({ title: '', description: '', date: new Date() })
    }
  }

  const handleRSVP = (eventId: number, status: 'yes' | 'no') => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, rsvp: status } : event
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-800">Event Planner</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">My Profile</Button>
              <Button>Logout</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Event Suggestions Section */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Suggest New Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Event Title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <Textarea
                  placeholder="Event Description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                />
                <Button onClick={handleAddEvent}>Add Event</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{format(event.date, 'MMM d, yyyy')}</p>
                  <p className="mt-2">{event.description}</p>
                  <div className="mt-4 flex items-center space-x-4">
                    <Button
                      variant={event.rsvp === 'yes' ? 'default' : 'outline'}
                      onClick={() => handleRSVP(event.id, 'yes')}
                    >
                      Going
                    </Button>
                    <Button
                      variant={event.rsvp === 'no' ? 'default' : 'outline'}
                      onClick={() => handleRSVP(event.id, 'no')}
                    >
                      Not Going
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-lg mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-600"> 2025 Event Planner. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
