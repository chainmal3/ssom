import React, { useState } from 'react'
import { parseISO, format } from 'date-fns'
import styles from '../styles/Calendar.module.css'
import { useGoogleCalendar } from '../hooks/useGoogleCalendar'
import {
  generateGoogleCalendarUrl,
  downloadICalFile,
  generateGoogleCalendarSubscriptionUrl,
  generateICalSubscriptionUrl,
  ERROR_MESSAGES,
  CalendarEvent,
} from '../utils/calendarIntegration'

const Calendar: React.FC = () => {
  // State for notification messages
  const [notification, setNotification] = useState<{
    message: string
    type: 'success' | 'error'
    visible: boolean
  }>({ message: '', type: 'success', visible: false })

  const { events, loading, error } = useGoogleCalendar(
    'soundsystemsofmelbourne@gmail.com',
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
    10,
  )

  // Show notification with auto-hide
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, visible: true })
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }))
    }, 5000)
  }

  // Function to extract Instagram URL from description
  const extractInstagramUrl = (description: string): string | null => {
    const hrefMatch = description.match(/<a href="([^"]+)"/)
    return hrefMatch ? hrefMatch[1] : null
  }

  // Function to clean description text by removing HTML tags
  const cleanDescription = (description: string): string => {
    return description.replace(/<a href="[^"]+"[^>]*>([^<]*)<\/a>/g, '').trim()
  }

  // Handle Google Calendar subscription with error handling
  const handleGoogleSubscription = (e: React.MouseEvent) => {
    try {
      window.open(generateGoogleCalendarSubscriptionUrl(), '_blank')
    } catch (error) {
      e.preventDefault()
      showNotification(ERROR_MESSAGES.SUBSCRIPTION, 'error')
      console.error('Error subscribing to Google Calendar:', error)
    }
  }

  // Handle iCal subscription with error handling
  const handleICalSubscription = (e: React.MouseEvent) => {
    try {
      window.open(generateICalSubscriptionUrl(), '_blank')
    } catch (error) {
      e.preventDefault()
      showNotification(ERROR_MESSAGES.SUBSCRIPTION, 'error')
      console.error('Error subscribing to iCal:', error)
    }
  }

  // Handle adding event to Google Calendar with error handling
  const handleAddToGoogleCalendar = (
    e: React.MouseEvent,
    event: CalendarEvent,
  ) => {
    try {
      window.open(generateGoogleCalendarUrl(event), '_blank')
    } catch (error) {
      e.preventDefault()
      showNotification(ERROR_MESSAGES.GOOGLE_CALENDAR, 'error')
      console.error('Error adding to Google Calendar:', error)
    }
  }

  // Handle adding event to iCal with error handling
  const handleAddToICal = (event: CalendarEvent) => {
    try {
      downloadICalFile(event)
      showNotification('Event added to iCal successfully', 'success')
    } catch (error) {
      showNotification(ERROR_MESSAGES.ICAL, 'error')
      console.error('Error adding to iCal:', error)
    }
  }

  if (loading) return <div className={styles.loading}>Loading gigs...</div>
  if (error) return <div className={styles.error}>{error}</div>

  return (
    <div className={styles.calendarContainer}>
      {/* Notification component */}
      {notification.visible && (
        <div
          className={`${styles.notification} ${notification.type === 'error' ? styles.errorNotification : styles.successNotification}`}
        >
          {notification.message}
        </div>
      )}

      <div className={styles.calendarHeader}>
        <h2 className={styles.calendarTitle}>UPCOMING GIGS</h2>
        <div className={styles.subscriptionContainer}>
          <span className={styles.subscribeLabel}>Subscribe to Calendar:</span>
          <div className={styles.subscriptionButtons}>
            <a
              href={generateGoogleCalendarSubscriptionUrl()}
              onClick={handleGoogleSubscription}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.subscriptionButton}
              title="Add all SSOM events to your Google Calendar"
            >
              GCAL
            </a>
            <a
              href={generateICalSubscriptionUrl()}
              onClick={handleICalSubscription}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.subscriptionButton}
              title="Add all SSOM events to your iCal/Apple Calendar"
            >
              iCal
            </a>
          </div>
          <div className={styles.syncTimeNotification}>
            Subscription may take up to 10 mins to sync all events
          </div>
        </div>
      </div>
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
                <div className={styles.calendarIntegration}>
                  <div className={styles.calendarIntegrationTitle}>
                    Add to Calendar:
                  </div>
                  <div className={styles.calendarButtons}>
                    <a
                      href={generateGoogleCalendarUrl(event)}
                      onClick={(e) => handleAddToGoogleCalendar(e, event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.calendarButton}
                      title="Add this event to Google Calendar"
                    >
                      GCAL
                    </a>
                    <button
                      onClick={() => handleAddToICal(event)}
                      className={styles.calendarButton}
                      title="Download iCal file for this event"
                    >
                      iCal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Calendar
