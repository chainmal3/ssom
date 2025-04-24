import { useState, useEffect } from 'react'

// Add type declaration for gapi to prevent TypeScript errors
declare global {
  interface Window {
    gapi: any
  }
}

interface CalendarEvent {
  id: string
  summary: string
  description?: string
  location?: string
  start: {
    dateTime?: string
    date?: string
    timeZone?: string
  }
  end: {
    dateTime?: string
    date?: string
    timeZone?: string
  }
}

interface CalendarHookReturn {
  events: CalendarEvent[]
  loading: boolean
  error: string | null
  refreshEvents: () => void
}

export function useGoogleCalendar(
  calendarId: string,
  apiKey: string,
  maxResults = 10,
): CalendarHookReturn {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = () => {
    setLoading(true)
    setError(null)

    // @ts-ignore
    window.gapi.client.calendar.events
      .list({
        calendarId: calendarId,
        timeMin: new Date().toISOString(),
        maxResults: maxResults,
        orderBy: 'startTime',
        singleEvents: true,
      })
      .then((response: any) => {
        const events = response.result.items
        setEvents(events)
        setLoading(false)
      })
      .catch((error: any) => {
        setError('Failed to fetch calendar events')
        setLoading(false)
        console.error('Error fetching calendar events:', error)
      })
  }

  const initClient = () => {
    // @ts-ignore
    window.gapi.client
      .init({
        apiKey: apiKey,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
      })
      .then(() => {
        fetchEvents()
      })
      .catch((error: any) => {
        setError('Failed to initialize Google API client')
        setLoading(false)
        console.error('Error initializing Google API client:', error)
      })
  }

  const initializeGoogleAPI = () => {
    // @ts-ignore - gapi isn't recognized by TypeScript by default
    window.gapi.load('client', initClient)
  }

  useEffect(() => {
    const loadGoogleAPI = () => {
      // Check if script is already loaded
      if (window.gapi) {
        initializeGoogleAPI()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://apis.google.com/js/api.js'
      script.onload = initializeGoogleAPI
      document.body.appendChild(script)
    }

    // Only run in browser environment to avoid SSR issues
    if (typeof window !== 'undefined') {
      loadGoogleAPI()
    }

    // Cleanup (optional)
    return () => {
      // Any cleanup if needed
    }
  }, [apiKey, calendarId])

  return { events, loading, error, refreshEvents: fetchEvents }
}

export default useGoogleCalendar
