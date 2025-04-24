import React from 'react'
import { parseISO, format } from 'date-fns'
import styles from '../styles/Calendar.module.css'
import { useGoogleCalendar } from '../hooks/useGoogleCalendar'

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

const Calendar: React.FC = () => {
  const { events, loading, error } = useGoogleCalendar(
    'soundsystemsofmelbourne@gmail.com',
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    10,
  )

  // Function to extract Instagram URL from description
  const extractInstagramUrl = (description: string): string | null => {
    const hrefMatch = description.match(/<a href="([^"]+)"/)
    return hrefMatch ? hrefMatch[1] : null
  }

  // Function to clean description text by removing HTML tags
  const cleanDescription = (description: string): string => {
    return description.replace(/<a href="[^"]+"[^>]*>([^<]*)<\/a>/g, '').trim()
  }

  if (loading) return <div className={styles.loading}>Loading events...</div>
  if (error) return <div className={styles.error}>{error}</div>

  return (
    <div className={styles.calendarContainer}>
      <h2 className={styles.calendarTitle}>Upcoming Events</h2>
      {events.length === 0 ? (
        <p className={styles.noEvents}>No upcoming events</p>
      ) : (
        <div className={styles.eventsGrid}>
          {events.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.eventDate}>
                {event.start?.dateTime
                  ? format(
                      parseISO(event.start.dateTime),
                      'MMM d yyyy',
                    ).toUpperCase()
                  : event.start?.date
                    ? format(
                        parseISO(event.start.date),
                        'MMM d yyyy',
                      ).toUpperCase()
                    : 'Date not specified'}
              </div>
              <div className={styles.eventDetails}>
                <h3 className={styles.eventTitle}>{event.summary}</h3>
                <div className={styles.eventTime}>
                  {event.start?.dateTime ? (
                    <>
                      <span>
                        {format(parseISO(event.start.dateTime), 'HH:mm')}
                      </span>
                      {event.end?.dateTime && ' — '}
                      <span>
                        {event.end?.dateTime
                          ? format(parseISO(event.end.dateTime), 'HH:mm')
                          : ''}
                      </span>
                    </>
                  ) : event.start?.date ? (
                    <span>TBD</span>
                  ) : (
                    ''
                  )}
                </div>
                {event.location && (
                  <div className={styles.eventLocation}>{event.location}</div>
                )}
                {event.description && (
                  <div className={styles.eventDescription}>
                    {cleanDescription(event.description)}
                    {extractInstagramUrl(event.description) && (
                      <a
                        href={extractInstagramUrl(event.description) || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.moreInfoButton}
                      >
                        MORE INFO
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Calendar
