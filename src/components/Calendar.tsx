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
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
}

const Calendar: React.FC = () => {
  const { events, loading, error } = useGoogleCalendar(
    'soundsystemsofmelbourne@gmail.com',
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    10,
  )

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
                  : 'Date not specified'}
              </div>
              <div className={styles.eventDetails}>
                <h3 className={styles.eventTitle}>{event.summary}</h3>
                <div className={styles.eventTime}>
                  <span>
                    {event.start?.dateTime
                      ? format(parseISO(event.start.dateTime), 'HH:mm')
                      : ''}
                  </span>
                  {event.start?.dateTime && event.end?.dateTime && ' — '}
                  <span>
                    {event.end?.dateTime
                      ? format(parseISO(event.end.dateTime), 'HH:mm')
                      : ''}
                  </span>
                </div>
                {event.location && (
                  <div className={styles.eventLocation}>{event.location}</div>
                )}
                {event.description && (
                  <div className={styles.eventDescription}>
                    {event.description}
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
